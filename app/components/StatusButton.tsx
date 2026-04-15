'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function () {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleStatusChange(status: string, checked: boolean) {
        const params = new URLSearchParams(searchParams);
        const current = params.get("query")?.split(",") || [];

        let updated;

        if (checked) {
            updated = [...current, status];
        } else {
            updated = current.filter(s => s !== status);
        }

        if (updated.length > 0) {
            params.set("query", updated.join(","));
            params.set("page", "1");
        } else {
            params.delete("query");
            params.delete("page");
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex justify-center">
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-80 border p-4 flex">
                <legend className="fieldset-legend">Status</legend>

                <label className="label">
                    <input
                        type="checkbox"
                        className="checkbox ml-2 mr-2"
                        onChange={(e)=>handleStatusChange("active", e.target.checked)}
                    />
                    Active
                </label>

                <label className="label">
                    <input
                        type="checkbox"
                        className="checkbox ml-2 mr-2"
                        onChange={(e)=>handleStatusChange("unused", e.target.checked)}
                    />
                    Unused
                </label>

                <label className="label">
                    <input
                        type="checkbox"
                        className="checkbox ml-2 mr-2"
                        onChange={(e)=>handleStatusChange("expiring", e.target.checked)}
                    />
                    Expiring
                </label>
            </fieldset>
        </div>
    );
}