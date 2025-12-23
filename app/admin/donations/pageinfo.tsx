// ./app/(admin)/donations/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/model';
import { HandCoins, Search, Edit, Trash2, Eye, CheckCircle, XCircle, Plus } from 'lucide-react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';

type DonationType = {
    _id: string;
    amount: number;
    currency: string;
    status: 'pending' | 'confirmed' | 'rejected';
    proof?: string;
    createdAt: string;
    user: { _id: string; firstName: string; email: string };
    campaign: { _id: string; title: string; currentAmount: number };
};

export default function AdminDonations() {
    const searchParams = useSearchParams();
    const filterCampaignId = searchParams.get('campaign');

    const [donations, setDonations] = useState<DonationType[]>([]);
    const [filteredDonations, setFilteredDonations] = useState<DonationType[]>([]);
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isProofModalOpen, setIsProofModalOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState<DonationType | null>(null);
    // Add these new states inside the component
    const [usersList, setUsersList] = useState<{ _id: string; firstName: string; email: string }[]>([]);
    const [campaignsList, setCampaignsList] = useState<{ _id: string; title: string }[]>([]);
    const [usersPage, setUsersPage] = useState(1);
    const [campaignsPage, setCampaignsPage] = useState(1);
    const [hasMoreUsers, setHasMoreUsers] = useState(true);
    const [hasMoreCampaigns, setHasMoreCampaigns] = useState(true);
    const PAGE_SIZE = 10;
    const [formData, setFormData] = useState({
        amount: 0,
        currency: 'USD',
        status: 'confirmed' as 'pending' | 'confirmed' | 'rejected',
        user: '',
        campaign: '',
    });

    // Fetch users
    const fetchUsers = async (page: number) => {
        const res = await fetch(`/admin/users/api?page=${page}&limit=${PAGE_SIZE}&sort=name`);
        if (res.ok) {
            const data = await res.json();
            if (page === 1) {
                setUsersList(data.users);
            } else {
                setUsersList(prev => [...prev, ...data.users]);
            }
            setHasMoreUsers(data.hasMore);
        }
    };

    // Fetch campaigns
    const fetchCampaigns = async (page: number) => {
        const res = await fetch(`/admin/campaigns/api?page=${page}&limit=${PAGE_SIZE}&sort=-createdAt`);
        if (res.ok) {
            const data = await res.json();
            if (page === 1) {
                setCampaignsList(data.campaigns);
            } else {
                setCampaignsList(prev => [...prev, ...data.campaigns]);
            }
            setHasMoreCampaigns(data.hasMore);
        }
    };
    const fetchDonations = async () => {
        try {
            let url = '/admin/donations/api';
            if (filterCampaignId) url += `?campaign=${filterCampaignId}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setDonations(data);
                setFilteredDonations(data);
            } else {
                toast.error('Failed to load donations');
            }
        } catch {
            toast.error('Error loading donations');
        }
    };

    // Fetch donations (optionally filtered by campaign)
    useEffect(() => {

        fetchDonations();
        fetchUsers(1);
        fetchCampaigns(1);
    }, [filterCampaignId]);

    // Status filter
    useEffect(() => {
        if (statusFilter === 'all') {
            setFilteredDonations(donations);
        } else {
            setFilteredDonations(donations.filter((d) => d.status === statusFilter));
        }
    }, [statusFilter, donations]);

    const resetForm = () => {
        setFormData({
            amount: 0,
            currency: 'USD',
            status: 'confirmed',
            user: '',
            campaign: '',
        });
    };

    const openCreateModal = () => {
        resetForm();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (donation: DonationType) => {
        setSelectedDonation(donation);
        setFormData({
            amount: donation.amount,
            currency: donation.currency,
            status: donation.status,
            user: donation.user._id,
            campaign: donation.campaign._id,
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (donation: DonationType) => {
        setSelectedDonation(donation);
        setIsDeleteModalOpen(true);
    };

    const openProofModal = (donation: DonationType) => {
        setSelectedDonation(donation);
        setIsProofModalOpen(true);
    };

    const handleCreate = async () => {
        if (formData.amount <= 0 || !formData.user || !formData.campaign) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const res = await fetch('/admin/donations/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const newDonation = await res.json();
                setDonations([newDonation, ...donations]);
                toast.success('Donation created successfully');
                setIsCreateModalOpen(false);
                resetForm();
            } else {
                toast.error('Failed to create donation');
            }
        } catch {
            toast.error('Error creating donation');
        }
    };

    const handleEdit = async () => {
        if (!selectedDonation) return;

        try {
            const res = await fetch(`/admin/donations/api/${selectedDonation._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updated = await res.json();
                setDonations(donations.map((d) => (d._id === updated._id ? updated : d)));
                toast.success('Donation updated successfully');
                setIsEditModalOpen(false);
            } else {
                toast.error('Failed to update donation');
            }
        } catch {
            toast.error('Error updating donation');
        }
    };

    const handleDelete = async () => {
        if (!selectedDonation) return;

        try {
            const res = await fetch(`/admin/donations/api/${selectedDonation._id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setDonations(donations.filter((d) => d._id !== selectedDonation._id));
                toast.success('Donation deleted successfully');
                setIsDeleteModalOpen(false);
            } else {
                toast.error('Failed to delete donation');
            }
        } catch {
            toast.error('Error deleting donation');
        }
    };

    const handleConfirmReject = async (action: 'confirm' | 'reject') => {
        if (!selectedDonation) return;

        try {
            const res = await fetch(`/admin/donations/api/${selectedDonation._id}/${action}`, {
                method: 'PATCH',
            });

            if (res.ok) {
                const updated = await res.json();
                setDonations(donations.map((d) => (d._id === updated._id ? updated : d)));
                toast.success(`Donation ${action}ed successfully`);
                setIsProofModalOpen(false);
            } else {
                toast.error(`Failed to ${action} donation`);
            }
        } catch {
            toast.error(`Error ${action}ing donation`);
        }
    };

    return (
        <div className={DESIGN_TOKENS.spacing.margin}>
            <div className="flex justify-between items-center mb-8">
                <p className="md:text-2xl text-base font-bold text-gray-900 flex items-center gap-3">
                    <HandCoins className="text-primary-600" />
                    Manage Donations {filterCampaignId && '(Filtered by Campaign)'}
                </p>
                <Button variant="primary" onClick={openCreateModal} className='flex'>
                    <Plus className="w-5 h-5 mr-2" />
                    <p className="hidden md:block">
                        Add Donation
                    </p>

                </Button>
            </div>

            {/* Filters */}
            <Card className="mb-8">
                <CardHeader>Filter by Status</CardHeader>
                <CardBody>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </CardBody>
            </Card>

            {/* Donations Table */}
            <Card>
                <CardHeader>Donations List ({filteredDonations.length})</CardHeader>
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap text-xs md:text-base">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">Donor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">Campaign</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-primary-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDonations.map((donation) => (
                                    <tr key={donation._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {donation.user.firstName}<br />
                                            <span className="text-xs text-gray-500">({donation.user.email})</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 w-92">{donation.campaign.title}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {donation.amount.toLocaleString()} {donation.currency}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${donation.status === 'confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : donation.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(donation.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditModal(donation)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            {donation.status === 'pending' && donation.proof && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openProofModal(donation)}
                                                    className="text-purple-600 hover:text-purple-800"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openDeleteModal(donation)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredDonations.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No donations found</p>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold mb-6">Add New Donation</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Donor *</label>
                            <select
                                value={formData.user}
                                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-600"
                                required
                            >
                                <option value="">Select a donor</option>
                                {usersList.map(user => (
                                    <option key={user._id} value={user._id}>
                                        {user.firstName} ({user.email})
                                    </option>
                                ))}
                            </select>
                            {hasMoreUsers && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 w-full"
                                    onClick={() => {
                                        const nextPage = usersPage + 1;
                                        setUsersPage(nextPage);
                                        fetchUsers(nextPage);
                                    }}
                                >
                                    Load More Users
                                </Button>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign *</label>
                            <select
                                value={formData.campaign}
                                onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-600"
                                required
                            >
                                <option value="">Select a campaign</option>
                                {campaignsList.map(campaign => (
                                    <option key={campaign._id} value={campaign._id}>
                                        {campaign.title}
                                    </option>
                                ))}
                            </select>
                            {hasMoreCampaigns && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 w-full"
                                    onClick={() => {
                                        const nextPage = campaignsPage + 1;
                                        setCampaignsPage(nextPage);
                                        fetchCampaigns(nextPage);
                                    }}
                                >
                                    Load More Campaigns
                                </Button>
                            )}
                        </div>
                        <Input
                            label="Amount *"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                            className='text-gray-600'
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-600"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="NGN">NGN</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-600"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleCreate}>
                                Add Donation
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </Modal>

            {/* Edit Modal (similar to create, but pre-filled) */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold mb-6">Edit Donation</h2>
                    <div className="space-y-4">
                        {/* Same fields as create */}
                        <Input
                            label="User"
                            disabled
                            value={selectedDonation?.user.firstName}

                        />
                        <Input
                            label="Campaign"
                            disabled
                            value={selectedDonation?.campaign.title}
                        />
                        <Input
                            label="Amount"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="NGN">NGN</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleEdit}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Donation?</h2>
                    <p className="text-gray-700 mb-6">
                        Are you sure you want to delete this donation of {selectedDonation?.amount} {selectedDonation?.currency}?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={handleDelete}
                        >
                            Delete Donation
                        </Button>
                    </div>
                </motion.div>
            </Modal>

            {/* Proof Review Modal */}
            <Modal isOpen={isProofModalOpen} onClose={() => setIsProofModalOpen(false)}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold mb-4">Review Payment Proof</h2>
                    <p className="text-gray-700 mb-4">
                        Donation: {selectedDonation?.amount} {selectedDonation?.currency} to {selectedDonation?.campaign.title}
                    </p>
                    {selectedDonation?.proof ? (
                        <div className="mb-6">
                            <Image
                                src={selectedDonation.proof}
                                alt="Payment Proof"
                                width={500}
                                height={300}
                                className="rounded-lg border max-w-full h-auto"
                            />
                        </div>
                    ) : (
                        <p className="text-red-600 mb-6">No proof available</p>
                    )}
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsProofModalOpen(false)}>
                            Close
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => handleConfirmReject('reject')}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleConfirmReject('confirm')}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm
                        </Button>
                    </div>
                </motion.div>
            </Modal>
        </div>
    );
}