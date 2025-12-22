'use client';

import { useState, useEffect } from 'react';

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/model';
import { Megaphone, Search, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';

type CampaignType = {
    _id: string;
    title: string;
    description: string;
    currentAmount: number;
    active: boolean;
    creator: { _id: string; name: string; email: string };
    createdAt: string;
    category: string;
    targetAmount: number;
    images: [];
    tags: [];
};

export default function AdminCampaigns() {
    const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState<CampaignType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<CampaignType | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        targetAmount: 1000,
        active: true,
        images: [] as string[],
        tags: [] as string[],
    });

    // Fetch campaigns with populated creator
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await fetch('/admin/campaigns/api');
                if (res.ok) {
                    const data = await res.json();
                    setCampaigns(data.campaigns);
                    setFilteredCampaigns(data.campaigns);
                } else {
                    toast.error('Failed to load campaigns');
                }
            } catch {
                toast.error('Error loading campaigns');
            }
        };
        fetchCampaigns();
    }, []);

    // Search filter
    useEffect(() => {
        if (searchTerm) {
            const filtered = campaigns.filter((c) =>
                c.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCampaigns(filtered);
        } else {
            setFilteredCampaigns(campaigns);
        }
    }, [searchTerm, campaigns]);


    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            targetAmount: 1000,
            active: true,
            images: [] as string[],
            tags: [] as string[],
        });
    };

    const openCreateModal = () => {
        resetForm();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (campaign: CampaignType) => {
        setSelectedCampaign(campaign);
        setFormData({
            title: campaign.title,
            description: campaign.description,
            targetAmount: campaign.targetAmount,
            active: campaign.active,
            category: campaign.category,
            images: [] as string[],
            tags: [] as string[],
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (campaign: CampaignType) => {
        setSelectedCampaign(campaign);
        setIsDeleteModalOpen(true);
    };

    const handleCreate = async () => {
        if (!formData.title || formData.targetAmount <= 0) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const res = await fetch('/admin/campaigns/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    targetAmount: formData.targetAmount,
                    active: formData.active,
                    images: formData.images,     // ← Now included
                    tags: formData.tags,
                }),
            });

            if (res.ok) {
                const newCampaign = await res.json();
                setCampaigns([newCampaign, ...campaigns]);
                toast.success('Campaign created successfully');
                setIsCreateModalOpen(false);
                resetForm();
            } else {
                const error = await res.json();
                toast.error(error.message || 'Failed to create campaign');
            }
        } catch {
            toast.error('Error creating campaign');
        }
    };

    const handleEdit = async () => {
        if (!selectedCampaign) return;

        try {
            const res = await fetch(`/admin/campaigns/api/${selectedCampaign._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updated = await res.json();
                setCampaigns(
                    campaigns.map((c) => (c._id === updated._id ? updated : c))
                );
                toast.success('Campaign updated successfully');
                setIsEditModalOpen(false);
            } else {
                const error = await res.json();
                toast.error(error.message || 'Failed to update campaign');
            }
        } catch {
            toast.error('Error updating campaign');
        }
    };

    const handleDelete = async () => {
        if (!selectedCampaign) return;

        try {
            const res = await fetch(`/api/admin/campaigns/${selectedCampaign._id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setCampaigns(campaigns.filter((c) => c._id !== selectedCampaign._id));
                toast.success('Campaign deleted successfully');
                setIsDeleteModalOpen(false);
            } else {
                toast.error('Failed to delete campaign');
            }
        } catch {
            toast.error('Error deleting campaign');
        }
    };

    const progressPercentage = (current: number, goal: number) =>
        goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

    return (
        <div className={DESIGN_TOKENS.spacing.margin}>
            <div className="flex justify-between items-center mb-8">
                <p className="md:text-3xl text-base font-bold text-gray-900 flex items-center gap-3">
                    <Megaphone className="text-primary-600" />
                    Manage Campaigns
                </p>
                <Button variant="primary" onClick={openCreateModal} className='flex'>
                    <Plus className="w-5 h-5 mr-2" />
                    <p className="hidden md:block">
                        Create New Campaign
                    </p>

                </Button>
            </div>

            {/* Search */}
            <Card className="mb-8">
                <CardHeader>Search Campaigns</CardHeader>
                <CardBody>
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Campaigns Table */}
            <Card>
                <CardHeader>Campaigns List ({filteredCampaigns.length})</CardHeader>
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-primary-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">
                                        Creator
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">
                                        Goal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-primary-700 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCampaigns.map((campaign) => (
                                    <tr key={campaign._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {campaign.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {campaign.creator?.name || 'Unknown'}<br />
                                            <span className="text-xs text-gray-500">
                                                {campaign.creator?.email}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-32">
                                                    <div
                                                        className="bg-primary-500 h-2.5 rounded-full transition-all"
                                                        style={{
                                                            width: `${progressPercentage(
                                                                campaign.currentAmount,
                                                                campaign.targetAmount
                                                            )}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm text-gray-600">
                                                    {progressPercentage(
                                                        campaign.currentAmount,
                                                        campaign.targetAmount
                                                    ).toFixed(0)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            ${campaign.targetAmount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${campaign.active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {campaign.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(campaign.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditModal(campaign)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"

                                            >
                                                <Link
                                                    href={`/admin/donations?campaign=${campaign._id}`}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openDeleteModal(campaign)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredCampaigns.length === 0 && (
                            <p className="text-center text-gray-500 py-8">
                                No campaigns found
                            </p>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Create Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} className='overflow-scroll h-screen'>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold mb-6">Create New Campaign</h2>
                    <div className="space-y-4">
                        <Input
                            label="Title *"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Help Flood Victims"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                placeholder="Describe the purpose of this campaign..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <Input
                            label="Category *"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />

                        <Input
                            label="Target Amount ($)"
                            type="number"
                            value={formData.targetAmount}
                            onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
                        />
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Active (visible to users)</span>
                        </label>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Campaign Images
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={async (e) => {
                                    const files = e.target.files;
                                    if (!files || files.length === 0) return;

                                    const uploadPromises = Array.from(files).map(async (file) => {
                                        const formData = new FormData();
                                        formData.append('image', file);

                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: formData,
                                            });
                                            const data = await res.json();
                                            if (res.ok) {
                                                return data.url; // e.g., Cloudinary or your upload endpoint returns URL
                                            } else {
                                                toast.error(`Failed to upload ${file.name}`);
                                                return null;
                                            }
                                        } catch (err) {
                                            toast.error(`Error uploading ${file.name}`);
                                            return null;
                                        }
                                    });

                                    const uploadedUrls = (await Promise.all(uploadPromises)).filter(url => url !== null) as string[];
                                    setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
                                    toast.success(`${uploadedUrls.length} image(s) uploaded`);
                                }}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                            />

                            {/* Preview uploaded images */}
                            {formData.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {formData.images.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Upload ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border"
                                            />
                                            <button
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        images: prev.images.filter((_, i) => i !== index)
                                                    }));
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleCreate}>
                                Create Campaign
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold mb-6">Edit Campaign</h2>
                    <div className="space-y-4">
                        <Input
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <Input
                            label="Category *"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />

                        <Input
                            label="Target Amount ($)"
                            type="number"
                            value={formData.targetAmount}
                            onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
                        />
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>

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
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Campaign?</h2>
                    <p className="text-gray-700 mb-6">
                        Are you sure you want to delete <strong>{selectedCampaign?.title}</strong>?
                        This will not delete associated donations.
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
                            Delete Campaign
                        </Button>
                    </div>
                </motion.div>
            </Modal>
        </div>
    );
}