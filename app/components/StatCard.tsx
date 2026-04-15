import { ReactNode } from "react"

export default function StatCard({title, value, stat, icon,}: {
    title: string
    value: string
    stat: ReactNode
    icon: ReactNode
}) {
    return (
        <div
            className="
        flex-1 rounded-2xl bg-zinc-900 p-5 text-white
        shadow-md shadow-black/20
        border border-zinc-800
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-black/40
        hover:border-zinc-700
      "
        >
            <div className="flex justify-between items-center">
                <div className="text-sm text-zinc-500">{title}</div>
                <div className="text-white-400">{icon}</div>
            </div>

            <div className="mt-4 text-2xl font-bold">{value}</div>

            <div className="mt-2">
                {stat}
            </div>
        </div>
    )
}