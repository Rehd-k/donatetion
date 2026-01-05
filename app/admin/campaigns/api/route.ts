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



// 3. The Dataset (5 for each category)
const dummyCampaigns = [
  // --- MEDICAL ---
  {
    title: "Emergency Heart Surgery for Liam",
    description: "Liam was born with a congenital heart defect and needs urgent surgery.",
    category: "Medical",
    targetAmount: 50000,
    currentAmount: 12000,
    images: [{ url: "https://images.unsplash.com/photo-1551076805-e1869033e561", public_id: "med_01" }],
    tags: ["surgery", "children", "urgent"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Mobile Clinic for Rural Villages",
    description: "Funding a van equipped with basic medical supplies for remote areas.",
    category: "Medical",
    targetAmount: 25000,
    currentAmount: 8500,
    images: [{ url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d", public_id: "med_02" }],
    tags: ["rural", "healthcare", "mobile"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Cancer Treatment Support Fund",
    description: "Helping low-income families pay for chemotherapy and radiation.",
    category: "Medical",
    targetAmount: 100000,
    currentAmount: 45000,
    images: [{ url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118", public_id: "med_03" }],
    tags: ["cancer", "treatment", "support"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Prosthetics for War Victims",
    description: "Providing high-quality prosthetic limbs to civilian victims of conflict.",
    category: "Medical",
    targetAmount: 75000,
    currentAmount: 30000,
    images: [{ url: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b", public_id: "med_04" }],
    tags: ["prosthetics", "rehab", "war-relief"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Vaccine Drive 2024",
    description: "Ensuring 5,000 children receive polio and measles vaccinations.",
    category: "Medical",
    targetAmount: 10000,
    currentAmount: 2000,
    images: [{ url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef", public_id: "med_05" }],
    tags: ["vaccines", "prevention", "kids"],
    creator: "6949f291a2118b08f609e8dd"
  },

  // --- EDUCATION ---
  {
    title: "Build a Library in Eastwood",
    description: "Constructing a public library with internet access for the community.",
    category: "Education",
    targetAmount: 60000,
    currentAmount: 15000,
    images: [{ url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f", public_id: "edu_01" }],
    tags: ["library", "books", "literacy"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Scholarships for STEM Students",
    description: "Providing full tuition for 10 underprivileged students in engineering.",
    category: "Education",
    targetAmount: 40000,
    currentAmount: 18000,
    images: [{ url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", public_id: "edu_02" }],
    tags: ["scholarship", "stem", "university"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Tablets for Remote Learning",
    description: "Buying 500 tablets for students who cannot attend physical school.",
    category: "Education",
    targetAmount: 15000,
    currentAmount: 7000,
    images: [{ url: "https://images.unsplash.com/photo-1509062522246-3755977927d7", public_id: "edu_03" }],
    tags: ["tech", "remote-learning", "digital"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Renovate Local High School",
    description: "Fixing the roof and heating system of the city's oldest high school.",
    category: "Education",
    targetAmount: 85000,
    currentAmount: 22000,
    images: [{ url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b", public_id: "edu_04" }],
    tags: ["renovation", "infrastructure", "school"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "After-School Coding Club",
    description: "Funding teachers and software for a free coding bootcamp for teens.",
    category: "Education",
    targetAmount: 5000,
    currentAmount: 1200,
    images: [{ url: "https://images.unsplash.com/photo-1531482615713-2afd69097998", public_id: "edu_05" }],
    tags: ["coding", "youth", "skills"],
    creator: "6949f291a2118b08f609e8dd"
  },

  // --- ENVIRONMENT ---
  {
    title: "Plant 1 Million Trees",
    description: "Reforestation project to combat soil erosion and carbon emissions.",
    category: "Environment",
    targetAmount: 100000,
    currentAmount: 67000,
    images: [{ url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09", public_id: "env_01" }],
    tags: ["trees", "climate", "nature"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Ocean Plastic Cleanup",
    description: "Deploying nets and boats to clean up the Great Pacific Garbage Patch.",
    category: "Environment",
    targetAmount: 200000,
    currentAmount: 89000,
    images: [{ url: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", public_id: "env_02" }],
    tags: ["ocean", "plastic", "marine-life"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Save the Coral Reefs",
    description: "Research and restoration of bleached coral reefs in the Caribbean.",
    category: "Environment",
    targetAmount: 55000,
    currentAmount: 23000,
    images: [{ url: "https://images.unsplash.com/photo-1546026423-cc4642628d2b", public_id: "env_03" }],
    tags: ["coral", "ocean", "conservation"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Community Solar Panel Project",
    description: "Installing solar panels on public buildings to reduce city carbon footprint.",
    category: "Environment",
    targetAmount: 120000,
    currentAmount: 40000,
    images: [{ url: "https://images.unsplash.com/photo-1509391366360-2e959784a276", public_id: "env_04" }],
    tags: ["energy", "solar", "green"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Protect the Rainforest",
    description: "Buying land to prevent illegal logging in the Amazon basin.",
    category: "Environment",
    targetAmount: 500000,
    currentAmount: 310000,
    images: [{ url: "https://images.unsplash.com/photo-1516214104703-d870798883c5", public_id: "env_05" }],
    tags: ["rainforest", "conservation", "land"],
    creator: "6949f291a2118b08f609e8dd"
  },

  // --- EMERGENCY ---
  {
    title: "Earthquake Relief Fund",
    description: "Immediate food, water, and shelter for victims of the recent quake.",
    category: "Emergency",
    targetAmount: 250000,
    currentAmount: 150000,
    images: [{ url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04", public_id: "emg_01" }],
    tags: ["disaster", "earthquake", "relief"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Flood Victim Support",
    description: "Helping families rebuild homes destroyed by flash floods.",
    category: "Emergency",
    targetAmount: 80000,
    currentAmount: 20000,
    images: [{ url: "https://images.unsplash.com/photo-1455906876003-298ddf94db13", public_id: "emg_02" }],
    tags: ["flood", "rebuild", "housing"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Wildfire Evacuation Aid",
    description: "Providing hotel vouchers and gas money for evacuees.",
    category: "Emergency",
    targetAmount: 40000,
    currentAmount: 38000,
    images: [{ url: "https://images.unsplash.com/photo-1602989981847-9730620f4db7", public_id: "emg_03" }],
    tags: ["fire", "evacuation", "aid"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Refugee Crisis Winter Clothes",
    description: "Supplying jackets, blankets, and heaters for camps during winter.",
    category: "Emergency",
    targetAmount: 60000,
    currentAmount: 12000,
    images: [{ url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b", public_id: "emg_04" }],
    tags: ["refugees", "winter", "warmth"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Tornado Recovery Initiative",
    description: "Clearing debris and repairing power lines after the storm.",
    category: "Emergency",
    targetAmount: 90000,
    currentAmount: 15000,
    images: [{ url: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe", public_id: "emg_05" }],
    tags: ["storm", "tornado", "cleanup"],
    creator: "6949f291a2118b08f609e8dd"
  },

  // --- FOOD SECURITY ---
  {
    title: "City Soup Kitchen",
    description: "Serving 500 hot meals a day to the homeless community.",
    category: "Food Security",
    targetAmount: 30000,
    currentAmount: 5000,
    images: [{ url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c", public_id: "fs_01" }],
    tags: ["meals", "homeless", "hunger"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Community Garden Project",
    description: "Teaching locals to grow their own vegetables in urban spaces.",
    category: "Food Security",
    targetAmount: 8000,
    currentAmount: 4000,
    images: [{ url: "https://images.unsplash.com/photo-1592419044706-39796d40f98c", public_id: "fs_02" }],
    tags: ["garden", "sustainability", "vegetables"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "School Lunch Debt Relief",
    description: "Paying off lunch debts so no child goes hungry at school.",
    category: "Food Security",
    targetAmount: 12000,
    currentAmount: 11000,
    images: [{ url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352", public_id: "fs_03" }],
    tags: ["school", "children", "lunch"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Mobile Food Bank",
    description: "Delivering groceries to the elderly who cannot leave their homes.",
    category: "Food Security",
    targetAmount: 20000,
    currentAmount: 9000,
    images: [{ url: "https://images.unsplash.com/photo-1593113598332-cd288d649433", public_id: "fs_04" }],
    tags: ["elderly", "delivery", "groceries"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Famine Relief International",
    description: "Sending grain and nutritional supplements to drought-stricken regions.",
    category: "Food Security",
    targetAmount: 500000,
    currentAmount: 220000,
    images: [{ url: "https://images.unsplash.com/photo-1594708767771-a7502209ff51", public_id: "fs_05" }],
    tags: ["famine", "international", "emergency"],
    creator: "6949f291a2118b08f609e8dd"
  },

  // --- PHYSICAL HEALTH ---
  {
    title: "Youth Sports Equipment",
    description: "Buying jerseys and balls for the inner-city soccer league.",
    category: "Physical Health",
    targetAmount: 5000,
    currentAmount: 1500,
    images: [{ url: "https://images.unsplash.com/photo-1517649763962-0c623066013b", public_id: "ph_01" }],
    tags: ["sports", "youth", "fitness"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Yoga for Seniors",
    description: "Funding free weekly yoga classes to improve mobility in the elderly.",
    category: "Physical Health",
    targetAmount: 3000,
    currentAmount: 800,
    images: [{ url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b", public_id: "ph_02" }],
    tags: ["yoga", "seniors", "mobility"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Marathon for Mental Health",
    description: "Organizing a 5k run to raise awareness for physical and mental well-being.",
    category: "Physical Health",
    targetAmount: 10000,
    currentAmount: 6000,
    images: [{ url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", public_id: "ph_03" }],
    tags: ["running", "awareness", "event"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Public Gym Renovation",
    description: "Repairing broken equipment in the free public recreation center.",
    category: "Physical Health",
    targetAmount: 25000,
    currentAmount: 12000,
    images: [{ url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48", public_id: "ph_04" }],
    tags: ["gym", "public", "fitness"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Adaptive Bikes for Kids",
    description: "Purchasing custom bikes for children with physical disabilities.",
    category: "Physical Health",
    targetAmount: 35000,
    currentAmount: 28000,
    images: [{ url: "https://images.unsplash.com/photo-1541625602330-2277a4c46182", public_id: "ph_05" }],
    tags: ["disability", "bikes", "accessibility"],
    creator: "6949f291a2118b08f609e8dd"
  },

  // --- ANIMALS ---
  {
    title: "Shelter Dog Neutering",
    description: "Funding spay/neuter operations to control the stray population.",
    category: "Animals",
    targetAmount: 15000,
    currentAmount: 7000,
    images: [{ url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b", public_id: "an_01" }],
    tags: ["dogs", "shelter", "vet"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Elephant Sanctuary Food Fund",
    description: "Buying food for retired circus elephants in the sanctuary.",
    category: "Animals",
    targetAmount: 60000,
    currentAmount: 45000,
    images: [{ url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46", public_id: "an_02" }],
    tags: ["elephants", "wildlife", "conservation"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Save the Strays Winter Housing",
    description: "Building insulated kennels for stray cats and dogs.",
    category: "Animals",
    targetAmount: 5000,
    currentAmount: 2000,
    images: [{ url: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4", public_id: "an_03" }],
    tags: ["cats", "dogs", "winter"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Vet Bill Assistance",
    description: "Helping low-income owners pay for emergency pet surgeries.",
    category: "Animals",
    targetAmount: 20000,
    currentAmount: 8000,
    images: [{ url: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35", public_id: "an_04" }],
    tags: ["vet", "surgery", "pets"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Sea Turtle Rescue",
    description: "Rehabilitating injured sea turtles caught in fishing nets.",
    category: "Animals",
    targetAmount: 30000,
    currentAmount: 12000,
    images: [{ url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f", public_id: "an_05" }],
    tags: ["turtles", "ocean", "rescue"],
    creator: "6949f291a2118b08f609e8dd"
  },

  // --- CLEAN WATER ---
  {
    title: "Well for Village in Kenya",
    description: "Drilling a borehole to provide clean drinking water for 300 people.",
    category: "Clean Water",
    targetAmount: 15000,
    currentAmount: 15000,
    images: [{ url: "https://images.unsplash.com/photo-1583255340620-3a32f6bc4c01", public_id: "cw_01" }],
    tags: ["water", "africa", "infrastructure"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Water Filters for Families",
    description: "Distributing ceramic water filters to remove bacteria.",
    category: "Clean Water",
    targetAmount: 5000,
    currentAmount: 1200,
    images: [{ url: "https://images.unsplash.com/photo-1563273941-865f148e6589", public_id: "cw_02" }],
    tags: ["filters", "health", "sanitation"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Rainwater Harvesting Systems",
    description: "Installing catchment systems on roofs for dry season storage.",
    category: "Clean Water",
    targetAmount: 20000,
    currentAmount: 9000,
    images: [{ url: "https://images.unsplash.com/photo-1519634934898-3d85d7748464", public_id: "cw_03" }],
    tags: ["rain", "sustainable", "storage"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Fix the Pipes Flint",
    description: "Replacing lead pipes in older community housing.",
    category: "Clean Water",
    targetAmount: 100000,
    currentAmount: 65000,
    images: [{ url: "https://images.unsplash.com/photo-1585828465492-421712a4df0f", public_id: "cw_04" }],
    tags: ["infrastructure", "urban", "repair"],
    creator: "6949f291a2118b08f609e8dd"
  },
  {
    title: "Sanitation Stations",
    description: "Building handwashing stations and latrines to protect water sources.",
    category: "Clean Water",
    targetAmount: 12000,
    currentAmount: 4000,
    images: [{ url: "https://images.unsplash.com/photo-1574482620126-58406796d1aa", public_id: "cw_05" }],
    tags: ["sanitation", "hygiene", "health"],
    creator: "6949f291a2118b08f609e8dd"
  }
];

// 4. The Uploader Function (Controller)
export async function PUT(req: Request, res: Response) {
  try {
    // Optional: Clear existing data to avoid duplicates
    // await Campaign.deleteMany({}); 

    // Insert the data
    const result = await Campaign.insertMany(dummyCampaigns);


    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error seeding database:", error);

  }
};

