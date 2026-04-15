import StatCard from "../components/StatCard"
import ToolsTable from "../components/ToolsTable"
import { TrendingUp, Wrench, Building2, Users } from "lucide-react"
import ProgressBar from "@/app/components/progressBar"

export default async function Dashboard(props: {
    searchParams?: Promise<{
        query?: string
        page?: string
    }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1

    const response = await fetch("https://tt-jsonserver-01.alt-tools.tech/analytics")
    const data = await response.json()
    const budget = data.budget_overview
    const trends = data.kpi_trends
    const cost = data.cost_analytics

    return (
        <div className="min-h-screen p-4 md:p-8 text-white bg-black">
            <h1 className="mt-16 md:mt-10 text-2xl md:text-[30px] font-bold">
                Internal Tools Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
                Monitor and manage your organization's software tools and expenses
            </p>

            {/* ← grid au lieu de flex */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<TrendingUp className="inline-block rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1" />}
                    title="Monthly Budget"
                    value={`€${budget.current_month_total} / €${budget.monthly_limit}`}
                    stat={
                        <span>
                            <div className="mt-5">
                                <ProgressBar
                                    current={budget.current_month_total}
                                    limit={budget.monthly_limit}
                                />
                            </div>
                            <div className="inline-block rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-2 py-0.5 text-xs text-white">
                                {trends.budget_change}
                            </div>
                        </span>
                    }
                />

                <StatCard
                    icon={<Wrench className="inline-block rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-1" />}
                    title="Active Tools"
                    value={cost.active_users.toString()}
                    stat={
                        <span className="inline-block rounded-full bg-gradient-to-r from-purple-400 to-blue-500 px-2 py-0.5 text-xs text-white">
                            {trends.tools_change}
                        </span>
                    }
                />

                <StatCard
                    icon={<Building2 className="inline-block rounded-full bg-gradient-to-r from-orange-400 to-red-500 p-1" />}
                    title="Departments"
                    value="8"
                    stat={
                        <span className="inline-block rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-2 py-0.5 text-xs text-white">
                            {trends.departments_change}
                        </span>
                    }
                />

                <StatCard
                    icon={<Users className="inline-block rounded-full bg-gradient-to-r from-pink-400 to-red-500 p-1" />}
                    title="Cost/User"
                    value={`€${cost.cost_per_user}`}
                    stat={
                        <span className="inline-block rounded-full bg-gradient-to-r from-pink-400 to-red-500 px-2 py-0.5 text-xs text-white">
                            {trends.cost_per_user_change}
                        </span>
                    }
                />
            </div>

            <div className="mt-8 overflow-x-auto">
                <ToolsTable query={query} currentPage={currentPage} />
            </div>
        </div>
    )
}