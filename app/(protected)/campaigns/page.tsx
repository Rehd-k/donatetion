
import { auth } from '@/auth';
import { formatCurrency } from '@/lib/currency';

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/model';
import Input from '@/components/ui/Input';
import { PlusCircle, Rocket } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/model/users';
import { Campaign } from '@/lib/model/campaign';
import CampaignsClient from './campaigns';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

export default async function Campaigns() {
    await dbConnect();
    const session = await auth();
    const { redirect } = await import('next/navigation');

    if (!session?.user) {
        redirect('/login');
    } else {

        if (session.user?.role === 'admin' || session.user?.role === 'admin') {
            redirect('/admin');
        }
    }
    const user = await User.findById(session?.user.id);
    const currency = user?.preferredCurrency || 'USD';

    const campaigns = await Campaign.find({}).lean().sort({ createdAt: -1 });


    return <>
        <div className="flex justify-between items-center mb-6 p-2 bg-blue-50">
            <p className=" flex items-center md:text-xl text-base font-bold text-gray-700">
                <Rocket className="mr-2 text-primary-500" /> All Campaigns
            </p>
            <Button variant="primary">Create Campaign</Button>
        </div>
        <div className={DESIGN_TOKENS.spacing.margin}>

            <div className="px-2">
                <CampaignsClient campaignsList={JSON.stringify(campaigns)} userFavorites={user.favorites || []} user={JSON.stringify(user)} />
            </div>
        </div>
    </>


}