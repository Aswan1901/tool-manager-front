'use client'

import { useState, useEffect } from "react"

export default function ProgressBar({
                                        current,
                                        limit,
                                    }: {
    current: number
    limit: number
}) {
    const [animated, setAnimated] = useState(0)
    const percentage = Math.min((current / limit) * 100, 100)

    // Couleur selon le niveau de remplissage
    const barColor =
        percentage >= 90 ? "from-red-400 to-red-600" :
            percentage >= 70 ? "from-orange-400 to-red-500" :
                "from-green-400 to-blue-500"

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(percentage), 100)
        return () => clearTimeout(timer)
    }, [percentage])

    return (
        <div className="flex flex-col gap-2">
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-700 ease-out`}
                    style={{ width: `${animated}%` }}
                />
            </div>
            <div className="text-right text-xs text-zinc-500">
                {percentage.toFixed(1)}% utilisé
            </div>
        </div>
    )
}