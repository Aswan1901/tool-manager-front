import {Trash2, SquarePen, Eye} from "lucide-react"

export default function Row({id,tool, dept, users, cost, status}: {
    id: number;
    tool: string
    dept: string
    users: string
    cost: string
    status: "Active" | "Expiring" | "Unused"
}) {
    const statusStyles = {
        active: "bg-gradient-to-r from-green-400 to-blue-500 p-1",
        expiring: "bg-gradient-to-r from-orange-400 to-red-500",
        unused: "bg-gradient-to-r from-pink-400 to-red-500",
    }

    return (
        <tr className="border-b border-zinc-800 last:border-none">
            <td className="py-4">{id}</td>
            <td className="py-4">{tool}</td>
            <td className="py-4 text-zinc-400">{dept}</td>
            <td className="py-4">{users}</td>
            <td className="py-4">{cost}</td>
            <td className="py-4 text-right">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
              {status}
            </span>
            </td>
            <td className="py-4 flex justify-center">
                <div className="flex justify-end gap-3">
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
            </td>
        </tr>
    )
}
