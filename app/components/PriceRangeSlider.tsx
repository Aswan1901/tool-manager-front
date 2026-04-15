'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function PriceRangeSlider({ min = 0, max = 1000}: { min?: number; max?: number }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentMin = Number(searchParams.get("minPrice")) || min;
    const currentMax = Number(searchParams.get("maxPrice")) || max;

    const pct = (v: number) => ((v - min) / (max - min)) * 100;

    const handleChange = useCallback((key: 'minPrice' | 'maxPrice', value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, replace]);

    const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Number(e.target.value), currentMax - 100);
        handleChange("minPrice", String(val));
    };

    const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(Number(e.target.value), currentMin + 100);
        handleChange("maxPrice", String(val));
    };

    const leftPct  = pct(currentMin);
    const rightPct = pct(currentMax);

    return (
        <div className="flex flex-col gap-3 rounded-xl bg-zinc-900 px-4 py-3 w-64">
            <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Price range</span>
                <span className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 px-3 py-0.5 text-xs font-medium text-white">
                    €{currentMin.toLocaleString()} – €{currentMax.toLocaleString()}
                </span>
            </div>

            {/* Track */}
            <div className="relative h-1.5 rounded-full bg-zinc-700">
                {/* Filled range */}
                <div
                    className="absolute h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                    style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
                />
                {/* Min thumb */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white ring-2 ring-purple-500 pointer-events-none"
                    style={{ left: `${leftPct}%` }}
                />
                {/* Max thumb */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white ring-2 ring-blue-400 pointer-events-none"
                    style={{ left: `${rightPct}%` }}
                />
                {/* Invisible inputs on top */}
                <input
                    type="range" min={min} max={max} step={100}
                    value={currentMin}
                    onChange={handleMin}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                />
                <input
                    type="range" min={min} max={max} step={100}
                    value={currentMax}
                    onChange={handleMax}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                />
            </div>

            <div className="flex justify-between text-xs text-zinc-500">
                <span>€{currentMin.toLocaleString()}</span>
                <span>€{currentMax.toLocaleString()}</span>
            </div>
        </div>
    );
}