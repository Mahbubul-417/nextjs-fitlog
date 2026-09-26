"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Workout = {
    id: number;
    slug: string;
    name: string;
    categories: string[];
    equipment: string[];
    duration: number;
    calories: number;
    rating: number;
    difficulty: string;
    sets: number;
    reps: string;
    image: string;
    description: string;
    instructions: string[];
};

export default function WorkoutDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [addedToPlan, setAddedToPlan] = useState(false);
    const [savedForLater, setSavedForLater] = useState(false);

    useEffect(() => {
        const loadWorkout = async () => {
            try {
                const response = await fetch("/data/workout.json");

                if (!response.ok) {
                    throw new Error("Failed to load workout");
                }

                const data = await response.json();

                const foundWorkout = data.workouts.find(
                    (item: Workout) => item.id === Number(params.id)
                );

                if (!foundWorkout) {
                    router.replace("/404");
                    return;
                }

                setWorkout(foundWorkout);

                const plan = JSON.parse(
                    localStorage.getItem("fitlog-plan") || "[]"
                );

                const saved = JSON.parse(
                    localStorage.getItem("fitlog-saved") || "[]"
                );

                setAddedToPlan(plan.includes(foundWorkout.id));
                setSavedForLater(saved.includes(foundWorkout.id));
            } catch (error) {
                console.error(error);
                router.replace("/404");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            loadWorkout();
        }
    }, [params.id, router]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0d0f12]">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-md text-lime-400"></span>
                    <p className="text-xs text-zinc-500">
                        Loading workout...
                    </p>
                </div>
            </main>
        );
    }

    if (!workout) {
        return null;
    }

    const addToPlan = () => {
        const plan = JSON.parse(
            localStorage.getItem("fitlog-plan") || "[]"
        );

        if (plan.includes(workout.id)) {
            toast.info(`${workout.name} is already in your plan.`);
            return;
        }

        plan.push(workout.id);

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );

        window.dispatchEvent(new Event("fitlog-storage-update"));

        setAddedToPlan(true);

        toast.success(`${workout.name} added to today's plan!`);
    };

    const saveForLater = () => {
        const saved = JSON.parse(
            localStorage.getItem("fitlog-saved") || "[]"
        );

        if (saved.includes(workout.id)) {
            toast.info(`${workout.name} is already saved.`);
            return;
        }

        saved.push(workout.id);

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );

        window.dispatchEvent(new Event("fitlog-storage-update"));

        setSavedForLater(true);

        toast.success(`${workout.name} saved for later!`);
    };

    return (
        <main className="min-h-screen bg-[#0d0f12] text-white">

            <ToastContainer
                position="top-right"
                autoClose={2500}
                theme="dark"
            />

           

           
            <section className="px-5 py-8 md:px-8 md:py-12">
                <div className="mx-auto max-w-6xl">

                    <button
                        onClick={() => router.back()}
                        className="mb-6 text-[10px] text-zinc-500 transition hover:text-white"
                    >
                        ← BACK TO LIBRARY
                    </button>

                    <div className="grid gap-7 lg:grid-cols-[1fr_1.05fr]">

                        
                        <div className="overflow-hidden rounded-lg bg-zinc-900">

                            {!imageError && workout.image ? (
                                <img
                                    src={workout.image}
                                    alt={workout.name}
                                    onError={() => setImageError(true)}
                                    className="h-full min-h-[350px] w-full object-cover lg:min-h-[430px]"
                                />
                            ) : (
                                <div className="flex min-h-[350px] items-center justify-center bg-zinc-900 lg:min-h-[430px]">
                                    <div className="text-center">
                                        <div className="mb-3 text-4xl">
                                            🏋️
                                        </div>

                                        <p className="text-xs font-bold tracking-widest text-zinc-600">
                                            WORKOUT IMAGE
                                        </p>

                                        <p className="mt-2 text-[10px] text-zinc-700">
                                            Image will be added later
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>

                       
                        <div>

                            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                                {workout.name}
                            </h1>

                            <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-500">
                                {workout.description}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {workout.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="rounded-full bg-lime-400 px-3 py-1 text-[9px] font-bold text-black"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>

                            
                            <div className="mt-5 overflow-hidden rounded-lg border border-zinc-800 bg-[#15181e]">

                                {[
                                    ["Equipment", workout.equipment.join(", ")],
                                    ["Difficulty", workout.difficulty],
                                    ["Sets", workout.sets],
                                    ["Reps", workout.reps],
                                    ["Duration", `${workout.duration} min`],
                                    ["Calories", `${workout.calories} kcal`],
                                    ["Rating", workout.rating],
                                ].map(([label, value], index, array) => (
                                    <div
                                        key={label}
                                        className={`grid grid-cols-[1fr_auto] px-4 py-2.5 ${
                                            index !== array.length - 1
                                                ? "border-b border-zinc-800"
                                                : ""
                                        }`}
                                    >
                                        <span className="text-[8px] uppercase tracking-widest text-zinc-500">
                                            {label}
                                        </span>

                                        <span className="text-[9px] text-zinc-300">
                                            {value}
                                        </span>
                                    </div>
                                ))}

                            </div>

                           
                            <div className="mt-5">
                                <h2 className="text-xs font-black tracking-wide">
                                    INSTRUCTIONS
                                </h2>

                                <ol className="mt-3 space-y-2">
                                    {workout.instructions.map(
                                        (instruction, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-2 text-[9px] leading-4 text-zinc-400"
                                            >
                                                <span className="text-zinc-600">
                                                    {index + 1}.
                                                </span>

                                                <span>
                                                    {instruction}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ol>
                            </div>

                           
                            <div className="mt-6 flex flex-wrap gap-3">

                                <button
                                    onClick={addToPlan}
                                    className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-[9px] font-bold transition ${
                                        addedToPlan
                                            ? "bg-zinc-700 text-zinc-300"
                                            : "bg-lime-400 text-black hover:bg-lime-300"
                                    }`}
                                >
                                    <span>✓</span>

                                    {addedToPlan
                                        ? "Added to today's plan"
                                        : "Add to today's plan"}
                                </button>

                                <button
                                    onClick={saveForLater}
                                    className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-[9px] font-medium transition ${
                                        savedForLater
                                            ? "border-lime-400 text-lime-400"
                                            : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-white"
                                    }`}
                                >
                                    <span>
                                        {savedForLater ? "✓" : "□"}
                                    </span>

                                    {savedForLater
                                        ? "Saved"
                                        : "Save for later"}
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

           
        </main>
    );
}