import React from "react";
import Image from 'next/image';
import banner from '@/assets/banner.png';

const Banner = () => {
    return (
        <section className="mx-4 mt-7 rounded-[20px] border border-[#24262d] bg-[#15171c] px-6 py-10 sm:px-10  ">

            <div className="flex flex-col items-center justify-between gap-8 md:flex-row ">

               
                <div className="max-w-xl">

                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-[#ccff00]">
                        Workout Library
                    </p>

                    <h1 className="text-4xl font-extrabold leading-none text-white sm:text-5xl">
                        TRAIN WITH INTENT.
                        <br />
                        LOG EVERY SET.
                    </h1>

                    <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
                        FitLog is a dark, no-nonsense gym companion:
                        pick a lift, lock it into today&apos;s plan, and
                        watch the week&apos;s work add up.
                    </p>

                    <button className="mt-5 rounded-md bg-[#ccff00] px-5 py-2.5 text-xs font-bold text-black">
                        BROWSE WORKOUTS
                    </button>

                </div>


                
                <div>
                    <Image src={banner} alt="FitLog Banner" className="w-full max-w-lg rounded-md" />
                </div>

            </div>

        </section>
    );
};

export default Banner;