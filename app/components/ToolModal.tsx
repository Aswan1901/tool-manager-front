'use client'

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const BASE_URL = "https://tt-jsonserver-01.alt-tools.tech"

const emptyForm = {
    name: "",
    category: "",
    active_users_count: "",
    monthly_cost: "",
    status: "Active",
    owner_department: "",
    description: "",
}

export default function ToolModal({tool, onClose, onSaved}: {
    tool?: any
    onClose: () => void
    onSaved: () => void
}) {
    const [form, setForm] = useState(tool ?? emptyForm)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)

    const isEdit = !!tool?.id

    function validate() {
        const e: Record<string, string> = {}
        if (!form.name.trim()) e.name = "Name is required"
        if (!form.category.trim()) e.category = "Category is required"
        if (!form.owner_department.trim()) e.owner_department = "Department is required"
        if (!form.monthly_cost) e.monthly_cost = "Monthly cost is required"
        return e
    }

    async function handleSubmit() {
        const e = validate()
        if (Object.keys(e).length) { setErrors(e); return }

        setLoading(true)
        const url = isEdit ? `${BASE_URL}/tools/${tool.id}` : `${BASE_URL}/tools`
        const method = isEdit ? "PUT" : "POST"

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                updated_at: new Date().toISOString(),
            }),
        })

        setLoading(false)
        onSaved()
        onClose()
    }

    function field(key: string, label: string, type = "text") {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-xs text-zinc-400">{label}</label>
                <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
                />
                {errors[key] && <span className="text-xs text-red-400">{errors[key]}</span>}
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-700 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                        {isEdit ? "Edit Tool" : "Add Tool"}
                    </h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                        <X className="size-5" />
                    </button>
                </div>

                {field("name", "Name")}
                {field("category", "Category")}
                {field("owner_department", "Department")}
                {field("monthly_cost", "Monthly Cost (€)", "number")}
                {field("active_users_count", "Active Users", "number")}

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-zinc-400">Status</label>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Expiring">Expiring</option>
                        <option value="Unused">Unused</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-zinc-400">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={3}
                        className="rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:bg-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 rounded-md text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? "Saving..." : isEdit ? "Save changes" : "Add tool"}
                    </button>
                </div>
            </div>
        </div>
    )
}