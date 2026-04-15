"use client";

import { type ReactNode, useCallback, useTransition } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface PaginationWithLinksProps {
    pageSizeSelectOptions?: {
        pageSizeSearchParam?: string;
        pageSizeOptions: number[];
    };
    totalCount: number;
    pageSize: number;
    page: number;
    pageSearchParam?: string;
    navigationMode?: "link" | "router";
}

export default function PaginationWithLinks({
                                                pageSizeSelectOptions,
                                                pageSize,
                                                totalCount,
                                                page,
                                                pageSearchParam,
                                                navigationMode = "link",
                                            }: PaginationWithLinksProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const buildLink = useCallback(
        (newPage: number) => {
            const key = pageSearchParam || "page";
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(key, String(newPage));
            return `${pathname}?${newSearchParams.toString()}`;
        },
        [pageSearchParam, searchParams, pathname]
    );

    const navigateToPage = useCallback(
        (newPage: number) => {
            if (navigationMode === "router") {
                const url = buildLink(newPage);
                startTransition(() => {
                    router.push(url);
                });
            }
        },
        [navigationMode, buildLink, router]
    );

    const navToPageSize = useCallback(
        (newPageSize: number) => {
            const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
            const newSearchParams = new URLSearchParams(searchParams || undefined);
            newSearchParams.set(key, String(newPageSize));
            newSearchParams.delete(pageSearchParam || "page");

            const url = `${pathname}?${newSearchParams.toString()}`;

            if (navigationMode === "router") {
                startTransition(() => router.push(url));
            } else {
                router.push(url);
            }
        },
        [pageSearchParam, searchParams, pathname, navigationMode, router]
    );

    const renderPageNumbers = () => {
        const items: ReactNode[] = [];
        const maxVisiblePages = 5;

        const createPageItem = (pageNum: number) => {
            const isActive = page === pageNum;

            const className = cn(
                "cursor-pointer transition-all rounded-md px-3 py-1",
                isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            );

            if (navigationMode === "router") {
                return (
                    <PaginationItem key={pageNum}>
                        <PaginationLink
                            onClick={() => navigateToPage(pageNum)}
                            isActive={isActive}
                            className={cn(className, isPending && "opacity-50 pointer-events-none")}
                        >
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            return (
                <PaginationItem key={pageNum}>
                    <PaginationLink href={buildLink(pageNum)} isActive={isActive} className={className}>
                        {pageNum}
                    </PaginationLink>
                </PaginationItem>
            );
        };

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(createPageItem(i));
            }
        } else {
            items.push(createPageItem(1));

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis className="text-zinc-400 dark:text-zinc-600" />
                    </PaginationItem>
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(createPageItem(i));
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis className="text-zinc-400 dark:text-zinc-600" />
                    </PaginationItem>
                );
            }

            items.push(createPageItem(totalPageCount));
        }

        return items;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full ">
            {pageSizeSelectOptions && (
                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <span>Rows per page</span>

                    <Select
                        value={String(pageSize)}
                        onValueChange={(value) => navToPageSize(Number(value))}
                    >
                        <SelectTrigger className="w-[120px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <SelectValue placeholder="Select page size" />
                        </SelectTrigger>

                        <SelectContent>
                            {pageSizeSelectOptions.pageSizeOptions.map((option) => (
                                <SelectItem key={option} value={String(option)}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <Pagination className="w-full flex justify-center justify-center">
                <PaginationContent className="max-sm:gap-1">
                    {isPending && navigationMode === "router" && (
                        <PaginationItem>
                            <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                        </PaginationItem>
                    )}

                    {/* PREVIOUS */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => navigateToPage(Math.max(page - 1, 1))}
                            aria-disabled={page === 1 || isPending}
                            className={cn(
                                "transition-colors",
                                page === 1 || isPending
                                    ? "opacity-40 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                                    : "cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            )}
                        />
                    </PaginationItem>

                    {/* PAGES */}
                    {renderPageNumbers()}

                    {/* NEXT */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => navigateToPage(Math.min(page + 1, totalPageCount))}
                            aria-disabled={page === totalPageCount || isPending}
                            className={cn(
                                "transition-colors",
                                page === totalPageCount || isPending
                                    ? "opacity-40 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                                    : "cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}