'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statuses = [
    { key: "active", color: "bg-green-500/15 text-green-400 border-green-500/20" },
    { key: "unused", color: "bg-zinc-500/10 text-zinc-500 border-zinc-300 dark:border-zinc-700" },
    { key: "expiring", color: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
];

export default function StatusFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const selected = searchParams.get("status")?.split(",") || [];

    function handleStatusChange(status: string) {
        const params = new URLSearchParams(searchParams);
        const current = params.get("status")?.split(",") || [];

        let updated;

        if (current.includes(status)) {
            updated = current.filter(s => s !== status);
        } else {
            updated = [...new Set([...current, status])];
        }

        if (updated.length > 0) {
            params.set("status", updated.join(","));
            params.set("page", "1");
        } else {
            params.delete("status");
            params.delete("page");
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex justify-center">
            <div className="
        w-80 p-5 rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-sm dark:shadow-black/30
      ">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    Status
                </div>

                <div className="flex flex-wrap gap-2">
                    {statuses.map(({ key, color }) => {
                        const isActive = selected.includes(key);

                        return (
                            <button
                                key={key}
                                onClick={() => handleStatusChange(key)}
                                className={`
                  px-3 py-1.5 rounded-full text-sm capitalize border
                  transition-all duration-200
                  ${isActive ? `${color} shadow-sm` : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"}
                  hover:-translate-y-[1px]`}>{key}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}