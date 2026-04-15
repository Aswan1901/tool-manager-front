'use client'

import { useEffect } from "react"
import { CheckCircle, XCircle } from "lucide-react"

export default function Toast({message, type = "success", onClose}: {
    message: string
    type?: "success" | "error"
    onClose: () => void
}) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000)
        return () => clearTimeout(t)
    }, [onClose])

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white shadow-lg border ${
            type === "success"
                ? "bg-zinc-900 border-green-500/30"
                : "bg-zinc-900 border-red-500/30"
        }`}>
            {type === "success"
                ? <CheckCircle className="size-4 text-green-400" />
                : <XCircle className="size-4 text-red-400" />
            }
            {message}
        </div>
    )
}