'use client'

import { Line } from "react-chartjs-2"
import { Card, CardBody, CardHeader } from "./ui/Card"

const LineChartComponent = ({ lineChartData }: any) => {
    return <Card>
        <CardHeader>Donation Trends (Last 6 Months)</CardHeader>
        <CardBody>
            {/* <Line  data={lineChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} /> */}
        </CardBody>
    </Card>
}

export default LineChartComponent;