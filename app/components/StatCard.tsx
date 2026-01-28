import { ReactNode } from "react"

export default function StatCard({
title, value, sub,icon}: {
    title: string
    value: string
    sub: ReactNode
    icon: ReactNode
}) {
    return (
        <div className="flex-1 rounded-2xl bg-zinc-900 p-5 text-white">
            <div className="flex justify-between">
            <div className="text-sm text-zinc-600">{title}</div>
            <div>{icon}</div>
            </div>
            <div className="mt-4 text-2xl font-bold">{value}</div>
            <div>
                {sub}
            </div>
        </div>
    )
}
