"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0b0c0e] px-6 text-white">

            <div className="text-center">

                <p className="text-sm font-semibold tracking-widest text-[#ccff00]">
                    FITLOG
                </p>

                <h1 className="mt-4 text-7xl font-bold tracking-tight">
                    404
                </h1>

                <h2 className="mt-3 text-xl font-semibold">
                    WORKOUT NOT FOUND
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
                    The workout you are looking for does not exist or may have
                    been removed.
                </p>

                <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-semibold text-black transition hover:bg-[#b8e600]"
                >
                    Back to Workouts
                </button>

            </div>

        </main>
    );
}