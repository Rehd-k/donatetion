import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/model/users';

export async function POST(request: Request) {
    await dbConnect();
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { campaignId, action } = await request.json();
    const update = action === 'add' ? { $addToSet: { favorites: campaignId } } : { $pull: { favorites: campaignId } };
    await User.findByIdAndUpdate(session.user.id, update);

    return NextResponse.json({ success: true });
}