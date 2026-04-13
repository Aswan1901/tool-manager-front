
import StatCard from "../components/StatCard"
import ToolsTable from "../components/ToolsTable"
import { TrendingUp, Wrench, Building2, Users } from "lucide-react"

export default async function Dashboard(props: {
    searchParams?: Promise<{
        query?: string
        page?: string
    }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1

    const response = await fetch("https://tt-jsonserver-01.alt-tools.tech/analytics");
    const data = await response.json();
    const budget = data.budget_overview
    const trends = data.kpi_trends
    const cost = data.cost_analytics



    return (
        <div className="min-h-screen p-8 text-white bg-black">
            <h1 className="mt-10 text-[30px] font-bold">Internal Tools Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-400">
                Monitor and manage your organization’s software tools and expenses
            </p>


            <div className="mt-6 flex gap-4">
                <StatCard
                    icon={<TrendingUp className="inline-block rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1" />}
                    title="Monthly Budget"
                    value={`€${budget.current_month_total} / €${budget.monthly_limit}`}
                    sub={
                        <span className="inline-block rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-2 py-0.5 text-xs text-white">
                            {trends.budget_change}
                        </span>
                    }
                />

                <StatCard
                    icon={<Wrench className="inline-block rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-1" />}
                    title="Active Tools"
                    value={cost.active_users.toString()}
                    sub={
                        <span className="inline-block rounded-full bg-gradient-to-r from-purple-400 to-blue-500 px-2 py-0.5 text-xs text-white">
                        {trends.tools_change}
                        </span>
                    }
                />

                <StatCard
                    icon={<Building2 className="inline-block rounded-full bg-gradient-to-r from-orange-400 to-red-500 p-1" />}
                    title="Departments"
                    value="8"
                    sub={
                        <span className="inline-block rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-2 py-0.5 text-xs text-white">
                        {trends.departments_change}
                        </span>
                    }
                />

                <StatCard
                    icon={<Users className="inline-block rounded-full bg-gradient-to-r from-pink-400 to-red-500 p-1" />}
                    title="Cost/User"
                    value={`€${cost.cost_per_user}`}
                    sub={
                        <span className="inline-block rounded-full bg-gradient-to-r from-pink-400 to-red-500 px-2 py-0.5 text-xs text-white">
                        {trends.cost_per_user_change}
                        </span>
                    }
                />
            </div>

            <div className="mt-8">
                <ToolsTable query={query} currentPage={currentPage} />
            </div>
        </div>
    )
}
