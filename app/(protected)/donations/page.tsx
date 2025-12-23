import { auth } from '@/auth'; // Your auth
import Button from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { User } from '@/lib/model/users';
import dbConnect from '@/lib/mongodb';
import ClientDonations from './DonationsClient';
import Link from 'next/link';

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
            <header className="justify-between items-end mb-6 p-2 bg-blue-50 md:flex hidden fixed w-full ml-auto  z-999">

                <Link href="/donate"><Button className="mt-4 md:mt-0">Donate Now</Button></Link>

            </header>
            <div className="md:py-8"></div>

            <ClientDonations currency={currency} />
        </>
    );
}