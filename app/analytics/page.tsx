"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchAnalytics() {
            const res = await fetch("https://tt-jsonserver-01.alt-tools.tech/analytics");
            const json = await res.json();
            setData(json);
        }
        fetchAnalytics();
    }, []);

    if (!data) {
        return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;
    }

    const budgetData = [
        { name: "Previous", value: data.budget_overview.previous_month_total },
        { name: "Current", value: data.budget_overview.current_month_total },
    ];

    const kpiData = [
        { name: "Budget", value: parseInt(data.kpi_trends.budget_change) },
        { name: "Tools", value: parseInt(data.kpi_trends.tools_change) },
        { name: "Departments", value: parseInt(data.kpi_trends.departments_change) },
        { name: "Cost/User", value: parseInt(data.kpi_trends.cost_per_user_change.replace("€", "")) },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-semibold mb-8">Analytics</h1>

            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <h2 className="mb-2 text-lg">Budget Overview</h2>
                    <p className="text-sm">Monthly Limit: €{data.budget_overview.monthly_limit}</p>
                    <p className="text-sm">Current Month: €{data.budget_overview.current_month_total}</p>
                    <p className="text-sm">Utilization: {data.budget_overview.budget_utilization}%</p>
                    <div className="w-full bg-zinc-800 rounded-full h-3 mt-3">
                        <div
                            className="bg-white h-3 rounded-full"
                            style={{ width: `${data.budget_overview.budget_utilization}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <h2 className="mb-4 text-lg">Monthly Spend Trend</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={budgetData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* KPI Trends */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm">Budget Change</p>
                    <p className="text-2xl font-bold">{data.kpi_trends.budget_change}</p>
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm">Tools Change</p>
                    <p className="text-2xl font-bold">{data.kpi_trends.tools_change}</p>
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm">Departments Change</p>
                    <p className="text-2xl font-bold">{data.kpi_trends.departments_change}</p>
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm">Cost/User Change</p>
                    <p className="text-2xl font-bold">{data.kpi_trends.cost_per_user_change}</p>
                </div>
            </div>

            {/* Cost Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <h2 className="mb-2 text-lg">Cost per User</h2>
                    <p className="text-3xl font-bold">€{data.cost_analytics.cost_per_user}</p>
                    <p className="text-sm">Previous: €{data.cost_analytics.previous_cost_per_user}</p>
                </div>

                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                    <h2 className="mb-4 text-lg">Users</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                            { name: "Active", value: data.cost_analytics.active_users },
                            { name: "Total", value: data.cost_analytics.total_users },
                        ]}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#ffffff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}