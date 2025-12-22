import { Suspense } from 'react';
import AdminDonations from './pageinfo';

export default function DonationsPage() {
    return (
        <Suspense fallback={<div>Loading donation form...</div>}>
            <AdminDonations />
        </Suspense>
    );
}