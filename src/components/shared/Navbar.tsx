"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    useEffect(() => {
        const updateCounts = () => {
            const plan = JSON.parse(
                localStorage.getItem("fitlog-plan") || "[]"
            );

            const saved = JSON.parse(
                localStorage.getItem("fitlog-saved") || "[]"
            );

            setPlanCount(plan.length);
            setSavedCount(saved.length);
        };

        updateCounts();

        window.addEventListener("storage", updateCounts);
        window.addEventListener("fitlog-storage-update", updateCounts);

        return () => {
            window.removeEventListener("storage", updateCounts);
            window.removeEventListener(
                "fitlog-storage-update",
                updateCounts
            );
        };
    }, []);

    return (
        <div className="sticky top-0 z-50 h-20 border-b border-gray-700 bg-[#0b0c0e]">

            <nav className="flex items-center justify-between px-4 py-3 sm:px-15">


                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={logo}
                        alt="FitLog"
                        className="h-9 w-9"
                    />

                    <span className="text-xs font-bold text-white">
                        FITLOG
                    </span>
                </Link>


                <div>
                    <ul className="flex items-center gap-2 text-[10px]">
                        <li>
                            <Link
                                href="/"
                                className="rounded-full bg-[#1b2700] px-3 py-1 font-medium text-[#ccff00]"
                            >
                                Workouts
                            </Link>

                            <Link
                                href="/my-plan"
                                className="px-2 py-1 text-gray-400 transition hover:text-white"
                            >
                                My Plan
                            </Link>
                        </li>
                    </ul>
                </div>


                <div className="flex items-center gap-4 text-[10px]">

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-gray-400 transition hover:text-white"
                    >
                        <span>Plan</span>

                        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ccff00] text-[7px] text-black">
                            {planCount}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan?saved=true"
                        className="flex items-center gap-2 text-gray-400 transition hover:text-white"
                    >
                        <span>Saved</span>

                        <span className="flex h-3 w-3 items-center justify-center rounded-full border border-gray-500 text-[7px] text-gray-300">
                            {savedCount}
                        </span>
                    </Link>

                </div>

            </nav>

        </div>
    );
};

export default Navbar;