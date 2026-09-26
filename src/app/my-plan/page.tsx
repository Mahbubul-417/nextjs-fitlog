"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type Workout = {
    id: number;
    name: string;
    categories: string[];
    equipment: string[];
    duration: number;
    calories: number;
    rating: number;
    image: string;
};

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState<"plan" | "saved">(
        searchParams.get("saved") === "true" ? "saved" : "plan"
    );

    const isSavedView = searchParams.get("saved") === "true";

    const currentTab = isSavedView ? "saved" : activeTab;

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
    const [planIds, setPlanIds] = useState<number[]>([]);
    const [savedIds, setSavedIds] = useState<number[]>([]);
    const [completedIds, setCompletedIds] = useState<number[]>([]);

    const [sortBy, setSortBy] = useState<SortOption>("duration");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("/data/workout.json");
                const data = await response.json();

                const plan = JSON.parse(
                    localStorage.getItem("fitlog-plan") || "[]"
                );

                const saved = JSON.parse(
                    localStorage.getItem("fitlog-saved") || "[]"
                );

                const completed = JSON.parse(
                    localStorage.getItem("fitlog-completed") || "[]"
                );

                setPlanIds(plan);
                setSavedIds(saved);
                setCompletedIds(completed);

                setWorkouts(
                    data.workouts.filter((workout: Workout) =>
                        plan.includes(workout.id)
                    )
                );

                setSavedWorkouts(
                    data.workouts.filter((workout: Workout) =>
                        saved.includes(workout.id)
                    )
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const currentWorkouts =
        currentTab === "plan" ? workouts : savedWorkouts;

    const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return a.calories - b.calories;
        }

        return b.rating - a.rating;
    });

    const totalMinutes = workouts.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = workouts.reduce(
        (total, workout) => total + workout.calories,
        0
    );

    const markAsDone = (id: number) => {
        const updatedCompleted = completedIds.includes(id)
            ? completedIds
            : [...completedIds, id];

        setCompletedIds(updatedCompleted);

        localStorage.setItem(
            "fitlog-completed",
            JSON.stringify(updatedCompleted)
        );
        

        toast.success("Workout marked as done!");
    };

    const removeFromPlan = (id: number) => {
        const updatedPlan = planIds.filter(
            (planId) => planId !== id
        );

        setPlanIds(updatedPlan);

        setWorkouts((current) =>
            current.filter((workout) => workout.id !== id)
        );

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(updatedPlan)
        );
        window.dispatchEvent(new Event("fitlog-storage-update"));

        toast.success("Workout removed from your plan!");
    };

    const removeFromSaved = (id: number) => {
        const updatedSaved = savedIds.filter(
            (savedId) => savedId !== id
        );

        setSavedIds(updatedSaved);

        setSavedWorkouts((current) =>
            current.filter((workout) => workout.id !== id)
        );

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(updatedSaved)
        );
        window.dispatchEvent(new Event("fitlog-storage-update"));

        toast.success("Workout removed from saved!");
    };

    const goToWorkout = (id: number) => {
        router.push(`/workouts/${id}`);
    };

    const showPlan = () => {
        setActiveTab("plan");
        router.push("/my-plan");
    };

    const showSaved = () => {
        setActiveTab("saved");
        router.push("/my-plan?saved=true");
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0b0c0e] px-6 py-16 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0b0c0e] px-6 py-10 text-white md:px-8">

            <div className="mx-auto max-w-7xl">

               
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        MY PLAN
                    </h1>

                    <p className="mt-1 text-xs text-zinc-500">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

               
                <div className="mt-6 grid grid-cols-3 rounded-xl border border-zinc-800 bg-[#12151b]">

                    <div className="border-r border-zinc-800 px-4 py-4">
                        <p className="text-[8px] text-zinc-500">
                            Exercises
                        </p>

                        <p className="mt-1 text-2xl font-bold text-[#ccff00]">
                            {workouts.length}
                        </p>
                    </div>

                    <div className="border-r border-zinc-800 px-4 py-4">
                        <p className="text-[8px] text-zinc-500">
                            Minutes
                        </p>

                        <p className="mt-1 text-2xl font-bold">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="px-4 py-4">
                        <p className="text-[8px] text-zinc-500">
                            Calories
                        </p>

                        <p className="mt-1 text-2xl font-bold">
                            {totalCalories}
                        </p>
                    </div>

                </div>

             
                <div className="mt-4 flex items-center justify-between">

                    <div className="flex rounded-lg border border-zinc-800 bg-[#12151b] p-1">

                        <button
                            type="button"
                            onClick={showPlan}
                            className={`rounded-md px-4 py-2 text-[9px] transition ${currentTab === "plan"
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-500"
                                }`}
                        >
                            Today&apos;s Plan
                        </button>

                        <button
                            type="button"
                            onClick={showSaved}
                            className={`rounded-md px-4 py-2 text-[9px] transition ${currentTab === "saved"
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-500"
                                }`}
                        >
                            Saved
                        </button>

                    </div>

                    <div className="flex items-center gap-2">

                        <span className="text-[9px] text-zinc-500">
                            Sort By
                        </span>

                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(
                                    e.target.value as SortOption
                                )
                            }
                            className="rounded-lg border border-zinc-800 bg-[#12151b] px-3 py-2 text-[9px] text-white outline-none"
                        >
                            <option value="duration">
                                Duration
                            </option>

                            <option value="calories">
                                Calories
                            </option>

                            <option value="rating">
                                Rating
                            </option>
                        </select>

                    </div>

                </div>

              
                <div className="mt-5">

                    {sortedWorkouts.length === 0 ? (
                        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 text-center">

                            <h2 className="text-sm font-bold">
                                NOTHING HERE YET
                            </h2>

                            <p className="mt-1 text-[8px] text-zinc-500">
                                Browse the library and add a lift to get moving.
                            </p>

                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                className="mt-4 rounded-full bg-[#ccff00] px-5 py-2 text-[9px] font-semibold text-black transition hover:bg-[#b8e600]"
                            >
                                Go to workouts
                            </button>

                        </div>
                    ) : (
                        <div className="space-y-2">

                            {sortedWorkouts.map((workout) => {

                                const isDone = completedIds.includes(
                                    workout.id
                                );

                                return (
                                    <div
                                        key={workout.id}
                                        className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#12151b] p-2.5"
                                    >

                                        {/* Image */}
                                        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-800">

                                            {workout.image && (
                                                <img
                                                    src={workout.image}
                                                    alt={workout.name}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display =
                                                            "none";
                                                    }}
                                                />
                                            )}

                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <h3 className="truncate text-[11px] font-bold">
                                                {workout.name}
                                            </h3>

                                            <p className="text-[8px] text-zinc-500">
                                                {workout.equipment.join(", ")}
                                            </p>

                                            <div className="mt-1 flex gap-2 text-[8px] text-zinc-400">

                                                <span>
                                                    ◷ {workout.duration} min
                                                </span>

                                                <span>
                                                    🔥 {workout.calories} kcal
                                                </span>

                                                <span className="text-[#ccff00]">
                                                    ★ {workout.rating}
                                                </span>

                                            </div>

                                        </div>

                                        
                                        <div className="flex shrink-0 items-center gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    goToWorkout(workout.id)
                                                }
                                                className="rounded-full border border-zinc-700 px-3 py-1.5 text-[8px] text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                                            >
                                                View Details
                                            </button>

                                            {currentTab === "plan" && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        markAsDone(workout.id)
                                                    }
                                                    disabled={isDone}
                                                    className={`rounded-full px-3 py-1.5 text-[8px] font-semibold ${isDone
                                                        ? "bg-zinc-700 text-zinc-400"
                                                        : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                                        }`}
                                                >
                                                    {isDone
                                                        ? "✓ Done"
                                                        : "✓ Mark as Done"}
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    currentTab === "plan"
                                                        ? removeFromPlan(workout.id)
                                                        : removeFromSaved(workout.id)
                                                }
                                                className="px-1 text-xs text-zinc-500 transition hover:text-white"
                                            >
                                                ×
                                            </button>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}