import { auth } from '@/auth';
import { Campaign } from '@/lib/model/campaign';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// Auth check with getServerSession or similar

export async function GET(request: Request) {
  await dbConnect();
  // Admin check...
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const campaigns = await Campaign.find({})
    .sort({ createdAt: -1 })  // Newest first
    .skip((page - 1) * limit)
    .limit(limit)
  // .select('title');

  const total = await Campaign.countDocuments();
  const hasMore = page * limit < total;

  return NextResponse.json({ campaigns, hasMore });
}

export async function POST(request: Request) {
  await dbConnect();

  const session = await auth();
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }


  const body = await request.json();

  const { title, description, category, targetAmount, active = true, images = [], tags = [] } = body;

  const newCampaign = await Campaign.create({
    title,
    description,
    category,
    targetAmount,
    currentAmount: 0,
    images,
    tags,
    active,
    creator: session?.user?.id, // Optional: set to session.user.id if you want to assign to admin
  });

  const populated = await Campaign.findById(newCampaign._id).populate('creator', 'name email');

  return NextResponse.json(populated, { status: 201 });
}

