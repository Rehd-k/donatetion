import { Campaign } from '@/lib/model/campaign';
import { Donation } from '@/lib/model/donation';
import { User } from '@/lib/model/users';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    // Admin check...

    const { id } = await params;

    const donation = await Donation.findById(id).populate('donor campaign');
    if (!donation || donation.status !== 'pending') {
        return NextResponse.json({ message: 'Invalid donation' }, { status: 400 });
    }

    donation.status = 'confirmed';
    await donation.save();

    // Update campaign amount
    await Campaign.findByIdAndUpdate(donation.campaign._id, {
        $inc: { currentAmount: donation.amount },
    });

    // Send email
    const user = await User.findById(donation.donor._id);
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your provider
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Donation Confirmed',
        text: `Your donation of ${donation.amount} ${donation.currency} to ${donation.campaign.title} has been confirmed. Thank you!`,
    });

    const populated = await Donation.findById(id)
        .populate('user', 'firstName email')
        .populate('campaign', 'title currentAmount');

    return NextResponse.json(populated);
}