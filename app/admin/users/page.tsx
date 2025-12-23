'use client';

import { useState, useEffect } from 'react';


import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/model';
import { Users, Search, Edit, Trash2, Crown } from 'lucide-react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

type UserType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin';
    preferredCurrency: string;
    createdAt: string;
};

export default function AdminUsers() {

    const [users, setUsers] = useState<UserType[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'user' as 'user' | 'admin',
        preferredCurrency: 'USD',
    });
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
                window.location.href = '/login';
            }
            return;
        }

        const role = (session as any)?.user?.role;

        if (role === 'user') {
            if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/dashboard')) {
                window.location.href = '/dashboard';
            }
        }
    }, [session, status]);

    // Fetch users on mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/admin/users/api');
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data.users);
                    setFilteredUsers(data.users);
                } else {
                    toast.error('Failed to load users');
                }
            } catch {
                toast.error('Error loading users');
            }
        };
        fetchUsers();
    }, []);

    // Filter logic
    useEffect(() => {
        let filtered = users;

        if (searchTerm) {
            filtered = filtered.filter(
                (u) =>
                    u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (roleFilter !== 'all') {
            filtered = filtered.filter((u) => u.role === roleFilter);
        }

        setFilteredUsers(filtered);
    }, [searchTerm, roleFilter, users]);

    const openEditModal = (user: UserType) => {
        setSelectedUser(user);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            preferredCurrency: user.preferredCurrency,
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (user: UserType) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = async () => {
        if (!selectedUser) return;

        try {
            const res = await fetch(`/admin/users/api/${selectedUser._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updated = await res.json();
                setUsers(users.map((u) => (u._id === updated._id ? updated : u)));
                toast.success('User updated successfully');
                setIsEditModalOpen(false);
            } else {
                const error = await res.json();
                toast.error(error.message || 'Failed to update user');
            }
        } catch {
            toast.error('Error updating user');
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;

        try {
            const res = await fetch(`/admin/users/api/${selectedUser._id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setUsers(users.filter((u) => u._id !== selectedUser._id));
                toast.success('User deleted successfully');
                setIsDeleteModalOpen(false);
            } else {
                toast.error('Failed to delete user');
            }
        } catch {
            toast.error('Error deleting user');
        }
    };

    return (
        <div className={DESIGN_TOKENS.spacing.margin}>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-8">
                <Users className="text-primary-600" />
                Manage Users
            </h1>

            {/* Filters */}
            <Card className="mb-8">
                <CardHeader>Search & Filter</CardHeader>
                <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value as any)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">Regular Users</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>
                </CardBody>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>Users List ({filteredUsers.length})</CardHeader>
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-primary-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                        First Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                        Last Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                        Currency
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-primary-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                                            {user.firstName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                                            {user.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-primary-100 text-primary-800'
                                                    }`}
                                            >
                                                {user.role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                                                {user.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {user.preferredCurrency}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditModal(user)}
                                                className="mr-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openDeleteModal(user)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No users found</p>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-2xl font-bold mb-6">Edit User</h2>
                    <div className="space-y-4">
                        <Input
                            label="First Name"
                            value={formData.firstName}
                            className='text-gray-700'
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        <Input
                            label="Last Name"
                            value={formData.lastName}
                            className='text-gray-700'
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            className='text-gray-700'
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-600"
                            >
                                <option value="user">Regular User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Currency
                            </label>
                            <select
                                value={formData.preferredCurrency}
                                onChange={(e) => setFormData({ ...formData, preferredCurrency: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-600"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="NGN">NGN (₦)</option>
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
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Delete User?</h2>
                    <p className="text-gray-700 mb-6">
                        Are you sure you want to delete <strong>{selectedUser?.firstName} {selectedUser?.lastName}</strong> (
                        {selectedUser?.email})? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="ghost" className="bg-red-600 text-white hover:bg-red-700" onClick={handleDelete}>
                            Delete User
                        </Button>
                    </div>
                </motion.div>
            </Modal>
        </div>
    );
}