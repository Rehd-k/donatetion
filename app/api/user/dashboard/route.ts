import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import dbConnect from '@/lib/mongodb'
import { Donation } from '@/lib/model/donation'
import { Campaign } from '@/lib/model/campaign'

export async function GET() {
  try {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const donations = await Donation.find({ user: session.user.id })
      .populate('campaign', 'title targetAmount currentAmount')
      .sort({ createdAt: -1 })
      .lean()

    const totalDonated = donations.reduce((sum, d) => sum + (d.amount || 0), 0)

    const campaigns = donations.map((d) => ({
      id: (d.campaign as any)?._id || d.campaign,
      title: (d.campaign as any)?.title || 'Unknown Campaign',
      donated: d.amount,
      targetAmount: (d.campaign as any)?.targetAmount || 0,
      currentAmount: (d.campaign as any)?.currentAmount || 0,
      donatedAt: d.createdAt,
    }))

    return NextResponse.json({ totalDonated, campaigns, donations })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
