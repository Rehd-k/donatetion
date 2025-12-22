import { User } from '@/lib/model/users';
import { NextResponse } from 'next/server';


export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // Auth check...
    const body = await request.json();
    const { id } = await params;
    const updated = await User.findByIdAndUpdate(id, body, { new: true }).select('-password');
    return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}