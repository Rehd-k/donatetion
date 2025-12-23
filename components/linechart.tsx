'use client'

import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardBody, CardHeader } from "./ui/Card"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const LineChartComponent = ({ lineChartData }: any) => {
    return <Card>
        <CardHeader>Donation Trends (Last 6 Months)</CardHeader>
        <CardBody>
            <Line
                data={lineChartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                }}
            />
            <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </CardBody>
    </Card>
}

export default LineChartComponent;