import { NextResponse } from 'next/server';

import getServerSession from "next-auth"
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/model/users';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const users = await User.find({})
        .sort({ name: 1 })  // Alphabetical by name
        .skip((page - 1) * limit)
        .limit(limit)
    // .select('name email');

    const total = await User.countDocuments();
    const hasMore = page * limit < total;

    return NextResponse.json({ users, hasMore });
}