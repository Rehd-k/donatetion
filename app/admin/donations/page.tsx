import { Suspense } from 'react';
import AdminDonations from './pageinfo';
import { auth } from '@/auth';

export default async function DonationsPage() {
    const session = await auth();
    const { redirect } = await import('next/navigation');

    if (!session?.user) {
        redirect('/login');
    } else {

        if (session.user?.role === 'user' || session.user?.role === 'user') {
            redirect('/dashboard');
        }
    }
    return (
        <Suspense fallback={<div>Loading donation form...</div>}>
            <AdminDonations />
        </Suspense>
    );
}