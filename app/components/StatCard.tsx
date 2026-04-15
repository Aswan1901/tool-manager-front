import { ReactNode } from "react"

export default function StatCard({
                                     title,
                                     value,
                                     stat,
                                     icon,
                                 }: {
    title: string
    value: string
    stat: ReactNode
    icon: ReactNode
}) {
    return (
        <div
            className="
        flex-1 rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        p-5

        shadow-sm dark:shadow-black/30
        transition-all duration-300 ease-out

        hover:-translate-y-1
        hover:shadow-lg dark:hover:shadow-black/50
        hover:border-zinc-300 dark:hover:border-zinc-700
      "
        >
            <div className="flex justify-between items-center">
                <div className="text-sm text-black dark:text-zinc-400">
                    {title}
                </div>

                <div className="text-white dark:text-zinc-300">
                    {icon}
                </div>
            </div>

            <div className="mt-4 text-2xl font-bold text-black dark:text-white">
                {value}
            </div>

            <div className="mt-2">
                {stat}
            </div>
        </div>
    )
}