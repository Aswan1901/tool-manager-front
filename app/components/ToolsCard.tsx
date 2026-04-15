import Image from "next/image";
import {SquarePen, Trash2} from "lucide-react";
export default function ToolsCard({name,image,category,userCount,monthlyCost,update,department,description, status, onDelete, onEdit}:{
    image: string,
    name: string,
    category: string,
    userCount: string,
    monthlyCost: string,
    update: string,
    department: string,
    description: string,
    status: "Active" | "Unused" | "Expiring"
    onEdit: () => void,
    onDelete: () => void
}) {
    const statusStyles = {
        active: "bg-gradient-to-r from-green-400 to-blue-500 p-1",
        expiring: "bg-gradient-to-r from-orange-400 to-red-500",
        unused: "bg-gradient-to-r from-pink-400 to-red-500",
    }

    return (
        <div
            className="
        flex-1 rounded-2xl p-5
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-sm dark:shadow-black/30

        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg dark:hover:shadow-black/50
      "
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <div className="font-semibold text-lg text-zinc-900 dark:text-white">
                        {name}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Department: {department}
                    </div>
                </div>

                <Image src={image} alt={name} width={50} height={50} />
            </div>

            {/* Category */}
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {category}
            </div>

            {/* Stats */}
            <div className="text-sm flex justify-between mt-4 text-zinc-700 dark:text-zinc-300">
                <div>User: {userCount}</div>
                <div>Cost: {monthlyCost}</div>
                <div>Updated: {update}</div>
            </div>

            {/* Description + status */}
            <div className="flex justify-between mt-6 items-start gap-3">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                </div>

                <span
                    className={`
            px-3 py-1 rounded-full text-xs font-semibold border
            ${statusStyles[status]}
          `}
                >
          {status}
        </span>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                    onClick={onEdit}
                    className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    <SquarePen className="size-4" />
                </button>

                <button
                    onClick={onDelete}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
        </div>
    );

}