import { Campaign } from '@/lib/model/campaign';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();


  const body = await request.json();

  // Map goalAmount → targetAmount if frontend still sends old name (optional fallback)
  const updateData = {
    ...body,
    targetAmount: body.targetAmount
  };

  const updated = await Campaign.findByIdAndUpdate(params.id, updateData, { new: true })
    .populate('creator', 'name email');

  if (!updated) {
    return NextResponse.json({ message: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Admin check...
  await Campaign.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}