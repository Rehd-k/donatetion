'use client'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardHeader, CardBody } from "./ui/Card";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ArcElement
);


const PieChartComponent = ({ pieChartData }: any) => {
    return <Card>
        <CardHeader>Donations by Campaign</CardHeader>
        <CardBody>

            <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
        </CardBody>
    </Card>
}

export default PieChartComponent;