'use client'
import { Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody } from "./ui/Card";

const PieChartComponent = ({ pieChartData }: any) => {
    return <Card>
        <CardHeader>Donations by Campaign</CardHeader>
        <CardBody>
            
            {/* <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} /> */}
        </CardBody>
    </Card>
}

export default PieChartComponent;