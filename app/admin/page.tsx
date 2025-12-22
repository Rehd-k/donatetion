import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Megaphone, HandCoins, TrendingUp, LayoutDashboard, Users } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Campaign } from '@/lib/model/campaign';
import { Donation } from '@/lib/model/donation';
import { User } from '@/lib/model/users';
import dbConnect from '@/lib/mongodb';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default async function AdminDashboard() {
    await dbConnect();

    const totalUsers = await User.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const totalDonations = await Donation.countDocuments({ status: 'confirmed' });
    const pendingDonations = await Donation.countDocuments({ status: 'pending' });

    const recentDonations = await Donation.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$amount' } } },
        { $sort: { _id: 1 } },
        { $limit: 30 }
    ]);

    const labels = recentDonations.map(d => d._id);
    const amounts = recentDonations.map(d => d.total);

    const campaignStatus = await Campaign.aggregate([
        { $group: { _id: '$active', count: { $sum: 1 } } }
    ]);
    const activeCount = campaignStatus.find(s => s._id === true)?.count || 0;
    const inactiveCount = campaignStatus.find(s => s._id === false)?.count || 0;

    const lineData = {
        labels,
        datasets: [{
            label: 'Daily Donations',
            data: amounts,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.3,
        }]
    };

    const doughnutData = {
        labels: ['Active Campaigns', 'Inactive Campaigns'],
        datasets: [{
            data: [activeCount, inactiveCount],
            backgroundColor: ['#22c55e', '#ef4444'],
        }]
    };

    const barData = {
        labels: ['Users', 'Campaigns', 'Confirmed Donations', 'Pending Review'],
        datasets: [{
            label: 'Count',
            data: [totalUsers, totalCampaigns, totalDonations, pendingDonations],
            backgroundColor: '#22c55e',
        }]
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <LayoutDashboard className="text-primary-600" />
                Admin Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-linear-to-br from-primary-50 to-primary-100">
                    <CardHeader className="flex items-center gap-2"><Users className="text-primary-600" /> Total Users</CardHeader>
                    <CardBody className="text-4xl font-bold text-primary-900">{totalUsers}</CardBody>
                </Card>
                <Card className="bg-linear-to-br from-blue-50 to-blue-100">
                    <CardHeader className="flex items-center gap-2"><Megaphone className="text-blue-600" /> Campaigns</CardHeader>
                    <CardBody className="text-4xl font-bold text-blue-900">{totalCampaigns}</CardBody>
                </Card>
                <Card className="bg-linear-to-br from-green-50 to-green-100">
                    <CardHeader className="flex items-center gap-2"><HandCoins className="text-green-600" /> Confirmed Donations</CardHeader>
                    <CardBody className="text-4xl font-bold text-green-900">{totalDonations}</CardBody>
                </Card>
                <Card className="bg-linear-to-br from-orange-50 to-orange-100">
                    <CardHeader className="flex items-center gap-2"><TrendingUp className="text-orange-600" /> Pending Review</CardHeader>
                    <CardBody className="text-4xl font-bold text-orange-900">{pendingDonations}</CardBody>
                </Card>
            </div>

            {/* Charts */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>Donations Last 30 Days</CardHeader>
                    <CardBody><Line data={lineData} options={{ responsive: true }} /></CardBody>
                </Card>
                <Card>
                    <CardHeader>Campaign Status</CardHeader>
                    <CardBody><Doughnut data={doughnutData} options={{ responsive: true }} /></CardBody>
                </Card>
            </div>

            <Card>
                <CardHeader>Overview Summary</CardHeader>
                <CardBody><Bar data={barData} options={{ responsive: true }} /></CardBody>
            </Card> */}
        </div>
    );
}