import { auth } from '@/auth'; // Your auth
import Button from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { User } from '@/lib/model/users';
import dbConnect from '@/lib/mongodb';
import ClientDonations from './DonationsClient';

// ClientDonations is defined below as a separate component

export default async function MyDonations() {
    await dbConnect();
    const session = await auth();
    const { redirect } = await import('next/navigation');

    if (!session?.user) {
        redirect('/login');
        return;
    } else {

        if (session.user?.role === 'admin' || session.user?.role === 'admin') {
            redirect('/admin');
            return;
        }
    }
    const user = await User.findById(session?.user.id);
    const currency = user?.preferredCurrency || 'USD';

    return (
        <>
            <header className="flex justify-between items-center bg-blue-50 p-2">
                <h1 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                    <Download className="mr-2 text-primary text-xs md:text-lg" /> Donations
                </h1>
                <Button className="mt-4 md:mt-0">Donate Now</Button>
            </header>
            <ClientDonations currency={currency} />
        </>
    );
}