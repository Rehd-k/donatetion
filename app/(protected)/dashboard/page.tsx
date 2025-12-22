import { auth } from '@/auth'; // Assume your auth utility
import { formatCurrency } from '@/lib/currency';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { DollarSign, TrendingUp, PieChart as PieIcon, Users } from 'lucide-react'; // Icons for flair
import { Campaign } from '@/lib/model/campaign';
import { Donation } from '@/lib/model/donation';
import { User } from '@/lib/model/users';
import dbConnect from '@/lib/mongodb';
import LineChartComponent from '@/components/linechart';
import PieChartComponent from '@/components/piechart';


export default async function Dashboard() {
    await dbConnect();

    // Fetch user (from session)
    const session = await auth();
    const user = await User.findById(session?.user?.id);
    const currency = user?.preferredCurrency || 'USD';

    // Fetch data
    const totalDonations = await Donation.aggregate([{ $match: { user: user._id } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
    const totalAmount = totalDonations[0]?.total || 0;

    const activeCampaigns = await Campaign.countDocuments({ active: true });
    const userDonations = await Donation.find({ user: user._id }).sort({ createdAt: -1 }).limit(5).populate('campaign');
    const topCampaigns = await Campaign.find({}).sort({ currentAmount: -1 }).limit(3);

    // Donation trend data (last 6 months, monthly aggregates)
    const trendData = await Donation.aggregate([
        { $match: { user: user._id, createdAt: { $gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, total: { $sum: '$amount' } } },
        { $sort: { _id: 1 } },
    ]);
    const labels = trendData.map(d => d._id);
    const dataPoints = trendData.map(d => d.total);

    const lineChartData = {
        labels,
        datasets: [{ label: 'Donations Over Time', data: dataPoints, borderColor: 'rgb(59, 130, 246)', tension: 0.1 }],
    };

    // Campaign distribution pie (user's donations by campaign)
    const pieData = await Donation.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: '$campaign', total: { $sum: '$amount' } } },
        { $lookup: { from: 'campaigns', localField: '_id', foreignField: '_id', as: 'campaign' } },
        { $unwind: '$campaign' },
    ]);
    const pieLabels = pieData.map(d => d.campaign.title);
    const pieValues = pieData.map(d => d.total);
    const pieChartData = {
        labels: pieLabels,
        datasets: [{ data: pieValues, backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'] }],
    };

    return (
        <>
            <header className="flex md:flex-row justify-between items-start md:items-center mb-6 p-2 bg-blue-50">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    {/* <DollarSign className="mr-2 text-blue-600" /> Dashboard */}
                </h1>
                <Button className="mt-4 md:mt-0">Donate Now</Button>
            </header>


            <div className="space-y-8 px-2 text-gray-700">


                {/* Overview Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-linear-to-br from-blue-50 to-blue-100">
                        <CardHeader className="flex items-center ">
                            <TrendingUp className="mr-2 text-blue-600" /> Total Donations
                        </CardHeader>
                        <CardBody className="text-4xl font-bold text-blue-900">{formatCurrency(totalAmount, currency)}</CardBody>
                    </Card>
                    <Card className="bg-linear-to-br from-green-50 to-green-100">
                        <CardHeader className="flex items-center">
                            <PieIcon className="mr-2 text-green-900" /> Active Campaigns
                        </CardHeader>
                        <CardBody className="text-4xl font-bold text-green-900">{activeCampaigns}</CardBody>
                    </Card>
                    <Card className="bg-linear-to-br from-purple-50 to-purple-100">
                        <CardHeader className="flex items-center">
                            <Users className="mr-2 text-purple-600" /> Your Contributions
                        </CardHeader>
                        <CardBody className="text-4xl font-bold text-purple-900">{userDonations.length}</CardBody>
                    </Card>
                    <Card className="bg-linear-to-br from-yellow-50 to-yellow-100">
                        <CardHeader className="flex items-center">
                            <DollarSign className="mr-2 text-yellow-600" /> Avg. Donation
                        </CardHeader>
                        <CardBody className="text-4xl font-bold text-yellow-900">
                            {formatCurrency(totalAmount / (userDonations.length || 1), currency)}
                        </CardBody>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LineChartComponent lineChartData={lineChartData} />
                    <PieChartComponent pieChartData={pieChartData} />
                </div>

                {/* Recent Donations Table */}
                <Card>
                    <CardHeader>Recent Donations</CardHeader>
                    <CardBody>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="pb-2">Date</th>
                                    <th>Campaign</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDonations.map((donation: any) => (
                                    <tr key={donation._id} className="border-t">
                                        <td className="py-2">{new Date(donation.createdAt).toLocaleDateString()}</td>
                                        <td>{donation.campaign.title}</td>
                                        <td>{formatCurrency(donation.amount, donation.currency)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>

                {/* Top Campaigns */}
                <Card>
                    <CardHeader>Top Campaigns</CardHeader>
                    <CardBody className="space-y-4">
                        {topCampaigns.map((campaign: any) => (
                            <div key={campaign._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                                <span className="font-medium">{campaign.title}</span>
                                <span>{formatCurrency(campaign.currentAmount, currency)} / {formatCurrency(campaign.targetAmount, currency)}</span>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </>

    );
}