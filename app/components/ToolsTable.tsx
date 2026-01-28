"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Row from "./Row"
import PaginationWithLinks from "./PaginationComponent"

export default function ToolsTable({
    query,
    currentPage,
    }: {
    query: string,
    currentPage: number
}){

    const [toolsData, setToolsData] = useState<any[]>([])
    const pageSize = 10

    useEffect(() => {
        async function fetchTools() {
            const response = await fetch("https://tt-jsonserver-01.alt-tools.tech/tools")
            const data = await response.json()
            setToolsData(data)
        }
        fetchTools()
    }, [])

    const filteredTools = toolsData.filter((tool) =>
        tool.name.toLowerCase().includes(query.toLowerCase())
    )

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedTools = filteredTools.slice(start, end)


    return (
        <div className="rounded-2xl bg-zinc-950 p-6 text-white shadow-lg">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr>
                    <th></th>
                    <th>Tool</th>
                    <th>Department</th>
                    <th>Users</th>
                    <th>Monthly Cost</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {paginatedTools.map((tool) => (
                    <Row
                        key={tool.id}
                        tool={tool.name}
                        dept={tool.category}
                        users={tool.active_users_count}
                        cost={tool.monthly_cost}
                        status={tool.status}
                    />
                ))}
                </tbody>
            </table>

            <PaginationWithLinks
                page={currentPage}
                pageSize={pageSize}
                totalCount={filteredTools.length}
                navigationMode="router"
            />

        </div>
    )
}
