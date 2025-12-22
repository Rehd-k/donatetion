import { Donation } from '@/lib/model/donation';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const body = await request.json();
    const { id } = await params;
    const updated = await Donation.findByIdAndUpdate(id, body, { new: true })
        .populate('user', 'firstName email')
        .populate('campaign', 'title currentAmount');

    if (!updated) {
        return NextResponse.json({ message: 'Donation not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    await Donation.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}