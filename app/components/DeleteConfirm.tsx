'use client'

export default function DeleteConfirm({toolName, onConfirm, onCancel}: {
    toolName: string
    onConfirm: () => void
    onCancel: () => void
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-700 p-6 flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-white">Delete tool</h2>
                <p className="text-sm text-zinc-400">
                    Are you sure you want to delete <span className="text-white font-medium">{toolName}</span>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:bg-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-red-500 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}