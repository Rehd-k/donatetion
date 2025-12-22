import { Donation } from '@/lib/model/donation';
import { User } from '@/lib/model/users';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  // Admin check...

  const donation = await Donation.findById(params.id).populate('donor campaign');
  if (!donation || donation.status !== 'pending') {
    return NextResponse.json({ message: 'Invalid donation' }, { status: 400 });
  }

  donation.status = 'rejected';
  await donation.save();

  // Send email
  const user = await User.findById(donation.donor._id);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Donation Rejected',
    text: `Your donation of ${donation.amount} ${donation.currency} to ${donation.campaign.title} has been rejected. Please contact support for details.`,
  });

  const populated = await Donation.findById(params.id)
    .populate('user', 'firstName email')
    .populate('campaign', 'title currentAmount');

  return NextResponse.json(populated);
}