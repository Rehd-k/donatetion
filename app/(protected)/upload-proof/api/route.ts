import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import { Donation } from '@/lib/model/donation';
import { User } from '@/lib/model/users';

export async function POST(request: Request) {
    await dbConnect();
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const donationId = formData.get('donationId') as string;
    const proof = formData.get('proof') as File;

    // Save proof (e.g., upload to cloud storage like S3, here mock as path)
    const proofPath = `/proofs/${donationId}-${proof.name}`; // Implement real upload

    const donation = await Donation.findByIdAndUpdate(donationId, { proof: proofPath, status: 'pending' }, { new: true });
    if (!donation) return NextResponse.json({ error: 'Donation not found' }, { status: 404 });

    const user = await User.findById(session.user.id);

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Donation Pending Confirmation',
        text: `Thank you for your donation of ${donation.amount} ${donation.currency}. It is pending review of your proof. We'll confirm soon!`,
    });

    return NextResponse.json({ success: true });
}