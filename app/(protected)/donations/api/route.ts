// app/api/donations/route.ts
// This is the API route for fetching paginated donations (server-side only).

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import { Donation } from '@/lib/model/donation';

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const params = req.nextUrl.searchParams;
    const page = parseInt(params.get('page') || '1', 10);
    const limit = parseInt(params.get('limit') || '30', 10);
    const startDate = params.get('startDate');
    const endDate = params.get('endDate');
    const status = params.get('status') || 'all';

    const query: any = { user: session.user.id }; // Adjust for your ID type

    if (startDate) {
        query.createdAt = { ...query.createdAt || {}, $gte: new Date(startDate) };
    }
    if (endDate) {
        query.createdAt = { ...query.createdAt || {}, $lte: new Date(endDate) };
    }
    if (status !== 'all') {
        query.status = status;
    }

    const skip = (page - 1) * limit;
    const donations = await Donation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('campaign');

    const total = await Donation.countDocuments(query);
    const hasMore = skip + donations.length < total;

    return NextResponse.json({
        donations: donations.map((d: any) => ({
            ...d.toObject(),
            _id: d._id.toString(),
        })),
        hasMore,
    });
}