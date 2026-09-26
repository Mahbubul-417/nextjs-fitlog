export type Workout = {
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