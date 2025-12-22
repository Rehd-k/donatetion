// ./app/(admin)/page.tsx

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Megaphone,
    HandCoins,
    Calendar,
    Globe
} from 'lucide-react';
import { Campaign } from '@/lib/model/campaign';
import { Donation } from '@/lib/model/donation';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/model/users';
import DashbaordCharts from './dashboardcharts';

export default async function AdminDashboard() {
    await dbConnect();

    // Core Stats
    const totalUsers = await User.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const totalConfirmedDonations = await Donation.countDocuments({ status: 'confirmed' });
    const totalPendingDonations = await Donation.countDocuments({ status: 'pending' });

    // Revenue
    const revenueResult = await Donation.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // This month vs last month
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = thisMonthStart;

    const thisMonthRevenue = await Donation.aggregate([
        { $match: { status: 'confirmed', createdAt: { $gte: thisMonthStart } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const lastMonthRevenue = await Donation.aggregate([
        { $match: { status: 'confirmed', createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const thisMonthAmt = thisMonthRevenue[0]?.total || 0;
    const lastMonthAmt = lastMonthRevenue[0]?.total || 0;
    const monthlyGrowth = lastMonthAmt === 0 ? 100 : ((thisMonthAmt - lastMonthAmt) / lastMonthAmt) * 100;

    // Last 12 months trend
    const months = [];
    const monthlyAmounts = [];
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const nextDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        months.push(date.toLocaleString('default', { month: 'short' }));

        const monthly = await Donation.aggregate([
            { $match: { status: 'confirmed', createdAt: { $gte: date, $lt: nextDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        monthlyAmounts.push(monthly[0]?.total || 0);
    }

    // Top 5 Campaigns
    const topCampaigns = await Donation.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: '$campaign', total: { $sum: '$amount' }, count: { $count: {} } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'campaigns', localField: '_id', foreignField: '_id', as: 'campaign' } },
        { $unwind: '$campaign' },
        { $project: { title: '$campaign.title', total: 1, count: 1 } }
    ]);

    // Top 5 Donors
    const topDonors = await Donation.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: '$user', total: { $sum: '$amount' }, count: { $count: {} } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        { $project: { name: '$user.name', email: '$user.email', total: 1, count: 1 } }
    ]);

    // Currency Breakdown
    const currencyBreakdown = await Donation.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: '$currency', total: { $sum: '$amount' } } }
    ]);

    const currencyLabels = currencyBreakdown.map(c => c._id);
    const currencyData = currencyBreakdown.map(c => c.total);

    const lineData = {
        labels: months,
        datasets: [{
            label: 'Monthly Revenue',
            data: monthlyAmounts,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            fill: true,
        }]
    };

    const doughnutData = {
        labels: currencyLabels,
        datasets: [{
            data: currencyData,
            backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
            borderWidth: 2,
            borderColor: '#fff',
        }]
    };

    const topCampaignsData = {
        labels: topCampaigns.map(c => c.title.substring(0, 20) + (c.title.length > 20 ? '...' : '')),
        datasets: [{
            label: 'Total Raised',
            data: topCampaigns.map(c => c.total),
            backgroundColor: '#22c55e',
        }]
    };

    return (
        <div className="space-y-8">
            <h1 className="md:text-xl text-base font-bold text-gray-900 flex items-center gap-3">
                <TrendingUp className="text-primary-600" />
                Admin Analytics Dashboard
            </h1>


            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-linear-to-br from-primary-50 to-primary-100">
                    <CardHeader className="flex items-center gap-2"><DollarSign className="text-primary-600" /> Total Revenue</CardHeader>
                    <CardBody className="text-4xl font-bold text-primary-900">
                        ${totalRevenue.toLocaleString()}
                    </CardBody>
                </Card>

                <Card className="bg-linear-to-br from-green-50 to-green-100">
                    <CardHeader className="flex items-center gap-2"><Calendar className="text-green-600" /> This Month</CardHeader>
                    <CardBody>
                        <div className="text-3xl font-bold text-green-900">${thisMonthAmt.toLocaleString()}</div>
                        <div className={`text-sm flex items-center gap-1 mt-2 ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {monthlyGrowth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {Math.abs(monthlyGrowth).toFixed(1)}% vs last month
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-linear-to-br from-blue-50 to-blue-100">
                    <CardHeader className="flex items-center gap-2"><Users className="text-blue-600" /> Total Users</CardHeader>
                    <CardBody className="text-4xl font-bold text-blue-900">{totalUsers}</CardBody>
                </Card>

                <Card className="bg-linear-to-br from-purple-50 to-purple-100">
                    <CardHeader className="flex items-center gap-2"><Megaphone className="text-purple-600" /> Active Campaigns</CardHeader>
                    <CardBody className="text-4xl font-bold text-purple-900">{totalCampaigns}</CardBody>
                </Card>
            </div>


            {/* Pending & Activity Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-linear-to-br from-yellow-50 to-yellow-100">
                    <CardHeader className="flex items-center gap-2"><HandCoins className="text-yellow-600" /> Pending Review</CardHeader>
                    <CardBody className="text-4xl font-bold text-yellow-900">{totalPendingDonations}</CardBody>
                </Card>

                <Card className="bg-linear-to-br from-green-50 to-green-100">
                    <CardHeader className="flex items-center gap-2"><Globe className="text-green-600" /> Total Transactions</CardHeader>
                    <CardBody className="text-4xl font-bold text-green-900">{totalConfirmedDonations}</CardBody>
                </Card>

                <Card className="bg-linear-to-br from-indigo-50 to-indigo-100">
                    <CardHeader className="flex items-center gap-2"><TrendingUp className="text-indigo-600" /> Avg. Donation</CardHeader>
                    <CardBody className="text-4xl font-bold text-indigo-900">
                        ${totalConfirmedDonations > 0 ? (totalRevenue / totalConfirmedDonations).toFixed(0) : 0}
                    </CardBody>
                </Card>
            </div>

            <DashbaordCharts lineData={lineData} doughnutData={doughnutData} topCampaignsData={topCampaignsData} topDonors={topDonors} />

        </div>
    );
}