"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Workout = {
    id: number;
    name: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
    difficulty: string;
    image: string;
};

export default function Library() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(
                    "https://api.abcz.workers.dev/api/fitlog"
                );

                if (!response.ok) {
                    throw new Error("Failed to load workouts");
                }

                const data = await response.json();

                setWorkouts(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load workouts");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <section className="px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">


                <div className="mb-10">
                    <h2 className="text-4xl font-bold tracking-tight text-white md:text-3xl">
                        THE LIBRARY
                    </h2>

                    <p className="mt-3 text-[15px] text-zinc-500">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>


                {loading && (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />
                    </div>
                )}


                {error && (
                    <div className="py-16 text-center text-red-500">
                        {error}
                    </div>
                )}


                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {workouts.map((workout) => (
                            <article
                                key={workout.id}
                                onClick={() =>
                                    router.push(`/workouts/${workout.id}`)
                                }
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-[#15171c] transition hover:-translate-y-1 hover:shadow-lg"
                            >


                                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">

                                    <img
                                        src={workout.image}
                                        alt={workout.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />

                                </div>


                                <div className="p-5">


                                    <div className="mb-3 flex flex-wrap gap-2">

                                        {workout.muscleGroups.map(
                                            (category) => (
                                                <span
                                                    key={category}
                                                    className="rounded-full bg-[#C2F800] px-3 py-1 text-xs font-bold text-zinc-600"
                                                >
                                                    {category.toUpperCase()}
                                                </span>
                                            )
                                        )}

                                    </div>


                                    <h3 className="text-xl font- bold text-white">
                                        {workout.name}
                                    </h3>


                                    <p className="mt-1 text-sm text-zinc-500">
                                        {workout.equipment}
                                    </p>


                                    <div className="mt-5 grid grid-cols-3 gap-3  border-zinc-100 pt-4">

                                        <div>
                                            <p className="text-xs text-zinc-400">
                                                Duration
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-zinc-500">
                                                {workout.duration} min
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-zinc-400">
                                                Calories
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-zinc-500">
                                                {workout.caloriesBurned} kcal
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-zinc-400">
                                                Rating
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-zinc-400">
                                                ★ {workout.rating}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
}