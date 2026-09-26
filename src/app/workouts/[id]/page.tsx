"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

type Workout = {
    id: number;
    name: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
    difficulty: string;
    sets: number;
    reps: number;
    image: string;
    description: string;
    instructions: string[];
};

export default function WorkoutDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);

    const [addedToPlan, setAddedToPlan] = useState(false);
    const [savedForLater, setSavedForLater] = useState(false);

    const id = params.id as string;

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await fetch(
                    `https://api.abcz.workers.dev/api/fitlog/${id}`
                );

                if (!response.ok) {
                    router.replace("/404");
                    return;
                }

                const data = await response.json();

                const workoutData = data.workout || data;

                setWorkout(workoutData);

                const plan = JSON.parse(
                    localStorage.getItem("fitlog-plan") || "[]"
                );

                const saved = JSON.parse(
                    localStorage.getItem("fitlog-saved") || "[]"
                );

                setAddedToPlan(plan.includes(workoutData.id));
                setSavedForLater(saved.includes(workoutData.id));
            } catch (error) {
                console.error(error);
                router.replace("/404");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id, router]);

    const addToPlan = () => {
        if (!workout) return;

        const plan = JSON.parse(
            localStorage.getItem("fitlog-plan") || "[]"
        );

        if (plan.includes(workout.id)) {
            toast.warning("This workout is already in your plan!");
            return;
        }

        const updatedPlan = [...plan, workout.id];

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(updatedPlan)
        );

        setAddedToPlan(true);

        window.dispatchEvent(new Event("fitlog-storage-update"));

        toast.success("Workout added to today's plan!");
    };

    const saveForLater = () => {
        if (!workout) return;

        const saved = JSON.parse(
            localStorage.getItem("fitlog-saved") || "[]"
        );

        if (saved.includes(workout.id)) {
            toast.warning("This workout is already saved!");
            return;
        }

        const updatedSaved = [...saved, workout.id];

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(updatedSaved)
        );

        setSavedForLater(true);

        window.dispatchEvent(new Event("fitlog-storage-update"));

        toast.success("Workout saved for later!");
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0b0c0e] text-white">
                <div className="flex min-h-[500px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />
                </div>
            </main>
        );
    }

    if (!workout) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[#0b0c0e] px-6 py-10 text-white md:px-10 lg:px-16">

            <div className="mx-auto max-w-7xl">


                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mb-6 text-xs text-zinc-500 transition hover:text-white"
                >
                    ← Back to Library
                </button>


                <div className="grid gap-8 lg:grid-cols-2">


                    <div className="overflow-hidden rounded-2xl bg-zinc-900">
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-full min-h-[350px] w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    </div>


                    <div className="flex flex-col justify-center">


                        <div className="mb-4 flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#1b2700] px-3 py-1 text-[10px] font-medium text-[#ccff00]"
                                >
                                    {muscle.toUpperCase()}
                                </span>
                            ))}
                        </div>


                        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                            {workout.name}
                        </h1>


                        <p className="mt-4 text-sm leading-6 text-zinc-400">
                            {workout.description}
                        </p>


                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

                            <div className="rounded-xl border border-zinc-800 bg-[#12151b] p-4">
                                <p className="text-[9px] text-zinc-500">
                                    Duration
                                </p>

                                <p className="mt-1 text-lg font-bold">
                                    {workout.duration}
                                    <span className="ml-1 text-xs font-normal text-zinc-500">
                                        min
                                    </span>
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-[#12151b] p-4">
                                <p className="text-[9px] text-zinc-500">
                                    Calories
                                </p>

                                <p className="mt-1 text-lg font-bold">
                                    {workout.caloriesBurned}
                                    <span className="ml-1 text-xs font-normal text-zinc-500">
                                        kcal
                                    </span>
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-[#12151b] p-4">
                                <p className="text-[9px] text-zinc-500">
                                    Rating
                                </p>

                                <p className="mt-1 text-lg font-bold text-[#ccff00]">
                                    ★ {workout.rating}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-[#12151b] p-4">
                                <p className="text-[9px] text-zinc-500">
                                    Difficulty
                                </p>

                                <p className="mt-1 text-sm font-semibold">
                                    {workout.difficulty}
                                </p>
                            </div>

                        </div>


                        <div className="mt-5 grid grid-cols-2 gap-3">

                            <div className="rounded-xl border border-zinc-800 bg-[#12151b] p-4">
                                <p className="text-[9px] text-zinc-500">
                                    Equipment
                                </p>

                                <p className="mt-1 text-sm text-zinc-300">
                                    {workout.equipment}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-[#12151b] p-4">
                                <p className="text-[9px] text-zinc-500">
                                    Sets × Reps
                                </p>

                                <p className="mt-1 text-sm text-zinc-300">
                                    {workout.sets} × {workout.reps}
                                </p>
                            </div>

                        </div>


                        <div className="mt-6 flex flex-wrap gap-3">

                            <button
                                type="button"
                                onClick={addToPlan}
                                disabled={addedToPlan}
                                className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${addedToPlan
                                        ? "bg-zinc-700 text-zinc-400"
                                        : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                    }`}
                            >
                                {addedToPlan
                                    ? "✓ Added to Today's Plan"
                                    : "Add to Today's Plan"}
                            </button>

                            <button
                                type="button"
                                onClick={saveForLater}
                                disabled={savedForLater}
                                className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition ${savedForLater
                                        ? "border-zinc-700 text-zinc-500"
                                        : "border-zinc-600 text-white hover:border-zinc-400"
                                    }`}
                            >
                                {savedForLater
                                    ? "✓ Saved for Later"
                                    : "Save for Later"}
                            </button>

                        </div>

                    </div>

                </div>


                <section className="mt-14 border-t border-zinc-800 pt-10">

                    <h2 className="text-2xl font-bold">
                        HOW TO PERFORM
                    </h2>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">

                        {workout.instructions.map(
                            (instruction, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 rounded-xl border border-zinc-800 bg-[#12151b] p-5"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                                        {index + 1}
                                    </span>

                                    <p className="text-sm leading-6 text-zinc-400">
                                        {instruction}
                                    </p>
                                </div>
                            )
                        )}

                    </div>

                </section>

            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                theme="dark"
            />

        </main>
    );
}