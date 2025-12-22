import { User } from '@/lib/model/users';
import { NextResponse } from 'next/server';


export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    // Auth check...
    const body = await request.json();
    const updated = await User.findByIdAndUpdate(params.id, body, { new: true }).select('-password');
    return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
}