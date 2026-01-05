import { auth } from '@/auth';
import { Campaign } from '@/lib/model/campaign';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// Auth check with getServerSession or similar

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category') || 'all';


  const campaigns = await Campaign.find({ category: category === 'all' ? { $exists: true } : category })
    .sort({ createdAt: -1 })  // Newest first
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
  // .select('title');

  const total = await Campaign.countDocuments();
  const hasMore = page * limit < total;
  return NextResponse.json({ campaigns, hasMore });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect(); // Ensure DB is connected (if needed)

    const formData = await request.formData();

    // Extract text fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const targetAmount = Number(formData.get('targetAmount'));
    const active = formData.get('active') === 'true';
    const tags = JSON.parse(formData.get('tags') as string);

    // Handle images: mix of existing URLs (strings) and new File uploads
    let finalImages: { url: string; public_id?: string }[] = [];

    // 1. Existing images (sent as JSON string array of URLs)
    const imagesJson = formData.get('imagesJson');
    if (imagesJson) {
      const existingImageUrls: string[] = JSON.parse(imagesJson as string);
      finalImages.push(
        ...existingImageUrls.map((url) => ({
          url,
          // public_id might not be available if coming from old data; optional
        }))
      );
    }

    // 2. New uploaded files (multiple entries with key 'images')
    const uploadedFiles = formData.getAll('images').filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (uploadedFiles.length > 0) {
      // Dynamic import to keep Cloudinary out of serverless bundle unless needed
      const { v2: cloudinary } = await import('cloudinary');
      cloudinary.config({ url: process.env.CLOUDINARY_URL });

      const uploadPromises = uploadedFiles.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: 'campaigns',
          resource_type: 'image',
        });

        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      finalImages.push(...uploadedImages);
    }

    // Create the campaign
    const newCampaign = await Campaign.create({
      title,
      description,
      category,
      targetAmount,
      currentAmount: 0,
      images: finalImages,
      tags,
      active,
      creator: session.user.id, // assuming your session has user.id
    });

    // Optionally populate creator info
    const populated = await Campaign.findById(newCampaign._id).populate(
      'creator',
      'firstName email image' // add any fields you want
    ).lean();

    return NextResponse.json({ success: true, campaign: populated }, { status: 201 });
  } catch (error: any) {
    console.error('Campaign creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign', details: error.message },
      { status: 500 }
    );
  }
}