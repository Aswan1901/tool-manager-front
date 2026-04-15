"use client"

import ToolsCard from "@/app/components/ToolsCard"
import ToolModal from "@/app/components/ToolModal"
import DeleteConfirm from "@/app/components/DeleteConfirm"
import Toast from "@/app/components/Toast"
import PaginationWithLinks from "@/app/components/PaginationComponent"
import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Plus } from "lucide-react"

import Jira from "@/app/ToolsIcon/jira.png"
import Adobe from "@/app/ToolsIcon/adobe.png"
import Canva from "@/app/ToolsIcon/canva.png"
import Figma from "@/app/ToolsIcon/figma.png"
import Github from "@/app/ToolsIcon/github.png"
import Hubspot from "@/app/ToolsIcon/hubspot.png"
import Zoom from "@/app/ToolsIcon/zoom.png"
import Slack from "@/app/ToolsIcon/slack.png"
import Notion from "@/app/ToolsIcon/notion.png"
import Office from "@/app/ToolsIcon/office.png"

const BASE_URL = "https://tt-jsonserver-01.alt-tools.tech"
const PAGE_SIZE = 10

const img: Record<string, any> = {
    Jira, GitHub: Github, Adobe, HubSpot: Hubspot,
    Zoom, Slack, Notion, Office, Canva, Figma,
}

export default function ToolsPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("query") || ""
    const currentPage = Number(searchParams.get("page")) || 1

    const [toolsData, setToolsData] = useState<any[]>([])
    const [showAdd, setShowAdd] = useState(false)
    const [editTool, setEditTool] = useState<any | null>(null)
    const [deleteTool, setDeleteTool] = useState<any | null>(null)
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

    const fetchTools = useCallback(async () => {
        const res = await fetch(`${BASE_URL}/tools`)
        const json = await res.json()
        setToolsData(json)
    }, [])

    useEffect(() => { fetchTools() }, [fetchTools])

    async function handleDelete() {
        if (!deleteTool) return
        await fetch(`${BASE_URL}/tools/${deleteTool.id}`, { method: "DELETE" })
        setDeleteTool(null)
        setToast({ message: `${deleteTool.name} deleted`, type: "success" })
        fetchTools()
    }

    const filtered = toolsData.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase())
    )

    const start = (currentPage - 1) * PAGE_SIZE
    const paginated = filtered.slice(start, start + PAGE_SIZE)

    return (
        <div className="min-h-screen p-4 md:p-8 text-white bg-black">
            <div className="flex items-center justify-between mt-16 md:mt-10 mb-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-semibold">Tools</h1>
                    <p className="mt-1 text-sm text-zinc-400">{filtered.length} tools found</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                >
                    <Plus className="size-4" />
                    Add Tool
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginated.map((tool) => (
                    <ToolsCard
                        key={tool.id}
                        name={tool.name}
                        image={img[tool.name]}
                        category={tool.category}
                        userCount={tool.active_users_count}
                        monthlyCost={tool.monthly_cost}
                        update={tool.updated_at?.split("T")[0] ?? "-"}
                        department={tool.owner_department}
                        description={tool.description}
                        status={tool.status}
                        onEdit={() => setEditTool(tool)}
                        onDelete={() => setDeleteTool(tool)}
                    />
                ))}
            </div>

            <div className="mt-8">
                <PaginationWithLinks
                    page={currentPage}
                    pageSize={PAGE_SIZE}
                    totalCount={filtered.length}
                    navigationMode="router"
                />
            </div>

            {showAdd && (
                <ToolModal
                    onClose={() => setShowAdd(false)}
                    onSaved={() => {
                        fetchTools()
                        setToast({ message: "Tool added successfully", type: "success" })
                    }}
                />
            )}

            {editTool && (
                <ToolModal
                    tool={editTool}
                    onClose={() => setEditTool(null)}
                    onSaved={() => {
                        fetchTools()
                        setToast({ message: "Tool updated successfully", type: "success" })
                    }}
                />
            )}

            {deleteTool && (
                <DeleteConfirm
                    toolName={deleteTool.name}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTool(null)}
                />
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    )
}