"use client";

import { useEffect, useState } from "react";

import type { Workout } from "@/types/workout";

export default function SavedPage() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const loadSavedWorkouts = async () => {
            const response = await fetch("/data/workout.json");
            const data = await response.json();

            const savedIds = JSON.parse(
                localStorage.getItem("fitlog-saved") || "[]"
            );

            const savedWorkouts = data.workouts.filter(
                (workout: Workout) => savedIds.includes(workout.id)
            );

            setWorkouts(savedWorkouts);
        };

        loadSavedWorkouts();
    }, []);

    return (
        <main className="min-h-screen bg-[#0b0c0e] px-6 py-16 text-white">
            <div className="mx-auto max-w-7xl">

                <h1 className="text-4xl font-bold">
                    SAVED
                </h1>

                <p className="mt-3 text-zinc-500">
                    Workouts you saved for later.
                </p>

                {workouts.length === 0 ? (
                    <div className="mt-16 text-center text-zinc-500">
                        No saved workouts yet.
                    </div>
                ) : (
                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {workouts.map((workout) => (
                            <div
                                key={workout.id}
                                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {workout.categories.map((category) => (
                                        <span
                                            key={category}
                                            className="rounded-full bg-[#1b2700] px-3 py-1 text-xs text-[#ccff00]"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="mt-4 text-xl font-bold">
                                    {workout.name}
                                </h2>

                                <p className="mt-2 text-sm text-zinc-500">
                                    {workout.equipment.join(", ")}
                                </p>

                                <div className="mt-5 flex gap-4 text-xs text-zinc-400">
                                    <span>{workout.duration} min</span>
                                    <span>{workout.calories} kcal</span>
                                    <span>★ {workout.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}