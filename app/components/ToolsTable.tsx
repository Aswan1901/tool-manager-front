"use client"

import { useEffect, useState } from "react"
import Row from "./Row"
import PaginationWithLinks from "./PaginationComponent"
import {SquarePen, Trash2, Eye} from "lucide-react";

export default function ToolsTable({
                                       query,
                                       currentPage,
                                   }: {
    query: string,
    currentPage: number
}) {
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
        <div className="rounded-2xl bg-zinc-950 p-4 md:p-6 text-white shadow-lg">

            {/* Desktop : tableau classique */}
            <div className="hidden md:block">
                <table className="w-full border-collapse text-sm">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Tool</th>
                        <th>Department</th>
                        <th>Users</th>
                        <th>Monthly Cost</th>
                        <th>Status</th>
                        <th>Actions</th>
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
            </div>

            {/* Mobile : cartes empilées */}
            <div className="flex flex-col gap-3 md:hidden">
                {paginatedTools.map((tool) => (
                    <div
                        key={tool.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-col gap-2"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{tool.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                tool.status === "active"
                                    ? "bg-gradient-to-r from-green-400 to-blue-500 p-1"
                                    : tool.status === "unused"
                                        ? "bg-gradient-to-r from-pink-400 to-red-500"
                                        : "bg-gradient-to-r from-orange-400 to-red-500"
                            }`}>
                                {tool.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-sm text-zinc-400">
                            <span>Department</span>
                            <span className="text-white text-right">{tool.category}</span>

                            <span>Users</span>
                            <span className="text-white text-right">{tool.active_users_count}</span>

                            <span>Monthly Cost</span>
                            <span className="text-white text-right">€{tool.monthly_cost}</span>
                        </div>
                        <div className="flex justify-end gap-3 border-t border-zinc-800 pt-3">
                            <button className="text-zinc-400 hover:text-white transition-colors">
                                <SquarePen className="size-5" />
                            </button>
                            <button className="text-zinc-400 hover:text-blue-400 transition-colors">
                                <Eye className="size-5" />
                            </button>
                            <button className="text-zinc-400 hover:text-red-400 transition-colors">
                                <Trash2 className="size-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <PaginationWithLinks
                    page={currentPage}
                    pageSize={pageSize}
                    totalCount={filteredTools.length}
                    navigationMode="router"
                />
            </div>
        </div>
    )
}