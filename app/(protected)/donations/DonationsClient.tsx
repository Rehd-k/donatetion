'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/currency';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Download } from 'lucide-react';

type DonationType = {
    _id: string;
    createdAt: string;
    campaign?: { title: string };
    amount: number;
    currency: string;
    status?: string; // Can be undefined
};

function ClientDonations({ currency }: { currency: string }) {
    const [donations, setDonations] = useState<DonationType[]>([]);
    const [displayedDonations, setDisplayedDonations] = useState<DonationType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');

    // Calculate totals from loaded donations
    const totalApproved = donations
        .filter(d => ['confirmed', 'success', 'approved'].includes(d.status?.toLowerCase() || ''))
        .reduce((sum, d) => sum + d.amount, 0);

    const totalPending = donations
        .filter(d => (d.status?.toLowerCase() || '') === 'pending')
        .reduce((sum, d) => sum + d.amount, 0);

    const fetchDonations = async (newPage = 1, append = false) => {
        setLoading(true);
        const params = new URLSearchParams();
        params.set('page', newPage.toString());
        params.set('limit', '30');
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);

        try {
            const res = await fetch(`/donations/api?${params.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const { donations: newDons, hasMore: hm } = await res.json();
      
            setDonations(prev => append ? [...prev, ...newDons] : newDons);
            setHasMore(hm);
            setPage(newPage);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations(1, false);
    }, [startDate, endDate]);

    // Client-side search (campaign title + amount) + status filter
    useEffect(() => {
        let filtered = donations;

        // Status filter
        if (statusFilter === 'approved') {
            filtered = filtered.filter(d => ['completed', 'success', 'approved'].includes(d.status?.toLowerCase() || ''));
        } else if (statusFilter === 'pending') {
            filtered = filtered.filter(d => (d.status?.toLowerCase() || '') === 'pending');
        }

        // Search filter
        if (search) {
            const lowerSearch = search.toLowerCase();
            filtered = filtered.filter(d => {
                const title = d.campaign?.title || 'General';
                const amountStr = d.amount.toString();
                return title.toLowerCase().includes(lowerSearch) || amountStr.includes(lowerSearch);
            });
        }

        setDisplayedDonations(filtered);
    }, [donations, search, statusFilter]);

    const loadMore = () => {
        fetchDonations(page + 1, true);
    };

    const downloadCSV = () => {
        const headers = 'Date,Campaign,Amount,Currency,Status\n';
        const rows = displayedDonations.map(d => {
            const date = new Date(d.createdAt).toLocaleDateString();
            const title = (d.campaign?.title || 'General').replace(/"/g, '""');
            const status = d.status || 'unknown';
            return `"${date}","${title}",${d.amount},${d.currency},${status}`;
        }).join('\n');

        const csv = headers + rows;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-donations.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-8 px-2 md:px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-linear-to-br from-green-50 to-white shadow-lg">
                    <CardHeader className="text-lg font-semibold">Total Donated (Confirmed)</CardHeader>
                    <CardBody className="text-4xl font-bold text-green-700">
                        {formatCurrency(totalApproved, currency)}
                    </CardBody>
                </Card>

                <Card className="bg-linear-to-br from-yellow-50 to-white shadow-lg">
                    <CardHeader className="text-lg font-semibold">Pending Donations</CardHeader>
                    <CardBody className="text-4xl font-bold text-yellow-700">
                        {formatCurrency(totalPending, currency)}
                    </CardBody>
                </Card>
            </div>

            <Card className="shadow-lg">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-xl font-semibold">Donation History</div>
                    <Button onClick={downloadCSV} variant="outline" className="flex items-center gap-2">
                        <Download size={16} /> Export CSV
                    </Button>
                </CardHeader>

                <CardBody>
                    {/* Filters */}
                    <div className="mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
                        <Input
                            placeholder="Search campaign or amount..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1"
                        />
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="px-4 py-2 border rounded-md bg-white"
                        >
                            <option value="all">All Status</option>
                            <option value="approved">Confirmed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    {/* Mobile stacked filters */}
                    {/* <div className="md:hidden space-y-3 mb-6">
                        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className="grid grid-cols-2 gap-3">
                            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="w-full px-4 py-2 border rounded-md bg-white"
                        >
                            <option value="all">All Status</option>
                            <option value="approved">Confirmed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div> */}

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left p-4 font-medium">Date</th>
                                    <th className="text-left p-4 font-medium">Campaign</th>
                                    <th className="text-left p-4 font-medium">Amount</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedDonations.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8 text-gray-500">
                                            {loading ? 'Loading donations...' : 'No donations found'}
                                        </td>
                                    </tr>
                                ) : (
                                    displayedDonations.map((d) => {
                                        const isApproved = ['completed', 'success', 'approved'].includes(d.status?.toLowerCase() || '');
                                        const isPending = (d.status?.toLowerCase() || '') === 'pending';
                                        return (
                                            <tr key={d._id} className="border-t hover:bg-gray-50">
                                                <td className="p-4">{new Date(d.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4">{d.campaign?.title || 'General Donation'}</td>
                                                <td className="p-4 font-medium">{formatCurrency(d.amount, d.currency)}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${isApproved ? 'bg-green-100 text-green-800' :
                                                            isPending ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {d.status ? d.status.charAt(0).toUpperCase() + d.status.slice(1) : 'Unknown'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {hasMore && (
                        <div className="mt-6 text-center">
                            <Button onClick={loadMore} disabled={loading}>
                                {loading ? 'Loading...' : 'Load More'}
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}

export default ClientDonations;