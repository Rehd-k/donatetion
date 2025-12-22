import { Donation } from '@/lib/model/donation';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaign');

    const filter = campaignId ? { campaign: campaignId } : {};

    const donations = await Donation.find(filter)
        .populate('user', 'firstName email')
        .populate('campaign', 'title currentAmount')
        .sort({ createdAt: -1 });

    return NextResponse.json(donations);
}

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();
        const newDonation = await Donation.create({
            ...body,
            status: body.status || 'confirmed',
        });

       

        const populated = await Donation.findById((newDonation as any)._id)
        .populate('user', 'firstName email')
        .populate('campaign', 'title currentAmount');
        console.log(populated)
        return NextResponse.json(newDonation, { status: 201 });
    } catch (error) {
        console.error('Error creating donation:', error);
    }

}