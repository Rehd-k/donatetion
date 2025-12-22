'use client'

import { Card, CardHeader, CardBody } from "@/components/ui/Card"
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
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function DashbaordCharts({ lineData, doughnutData, topCampaignsData, topDonors }: any) {
    return <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>Donations Last 30 Days</CardHeader>
                <CardBody><Line data={lineData} options={{ responsive: true }} /></CardBody>
            </Card>
            <Card>
                <CardHeader>Campaign Status</CardHeader>
                <CardBody><Doughnut data={doughnutData} options={{ responsive: true }} /></CardBody>
            </Card>
        </div>

        {/* <Card>
            <CardHeader>Overview Summary</CardHeader>
            <CardBody><Bar data={barData} options={{ responsive: true }} /></CardBody>
        </Card> */}
        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>Revenue Trend (Last 12 Months)</CardHeader>
                <CardBody>
                    <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                </CardBody>
            </Card>

            <Card>
                <CardHeader>Donations by Currency</CardHeader>
                <CardBody className="flex justify-center">
                    <div className="w-64">
                        <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
                    </div>
                </CardBody>
            </Card>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>Top 5 Campaigns</CardHeader>
                <CardBody>
                    <Bar
                        data={topCampaignsData}
                        options={{
                            responsive: true,
                            indexAxis: 'y',
                            plugins: { legend: { display: false } }
                        }}
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader>Top 5 Donors</CardHeader>
                <CardBody>
                    <div className="space-y-4">
                        {topDonors.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No donations yet</p>
                        ) : (
                            topDonors.map((donor: { _id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; total: { toLocaleString: () => string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; count: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: number) => (
                                <div key={donor._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{donor.name}</p>
                                            <p className="text-sm text-gray-500">{donor.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-primary-700">${donor.total.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">{donor.count} donations</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    </>
}