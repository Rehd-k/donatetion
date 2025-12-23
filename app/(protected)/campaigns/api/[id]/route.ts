import { Campaign } from "@/lib/model/campaign";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const campaign = await Campaign.findById(id);
    return NextResponse.json(campaign);
}