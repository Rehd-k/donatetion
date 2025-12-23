import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import { Donation } from '@/lib/model/donation';

export async function POST(request: Request) {
  await dbConnect();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  body.donor = session.user.id;
  const newDonation = await Donation.create(body);

  return NextResponse.json(newDonation);
}
