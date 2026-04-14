import { ReactNode } from "react"
import ProgressBar from "@/app/components/progressBar";
import {current} from "immer";

export default function StatCard({title, value, stat,icon}: {
    title: string
    value: string
    stat: ReactNode
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
                {stat}
            </div>
        </div>
    )
}
