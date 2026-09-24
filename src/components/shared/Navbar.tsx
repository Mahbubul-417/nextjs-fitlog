import React from "react";
import Image from 'next/image';
import logo from '@/assets/logo.png';


const Navbar = () => {
    return (
        <div className="border-b border-[#1a1b1f] sticky top-0 z-50 bg-[#0b0c0e]">

            <nav className="flex justify-between items-center px-4 sm:px-6 py-3">


                <div className="flex items-center gap-2">
                    <Image src={logo} alt="Dev Stack" className="w-9 h-9" />
                    <span className="text-xs font-bold text-white">
                        FITLOG
                    </span>
                </div>

                
                <div>

                <ul className="flex items-center gap-2 text-[10px]">

                    <li>

                        <a className="rounded-full bg-[#1b2700] px-3 py-1  font-medium text-[#ccff00]">
                            Workouts
                        </a>

                        <a className="px-2 py-1  text-gray-400">
                            My Plan
                        </a>
                    </li>

                </ul>

                </div>

                <div className="flex items-center gap-4 text-[10px]">

                    <div className="flex items-center gap-2 text-gray-400">
                        <span>Plan</span>

                        <span className="flex items-center justify-center w-3 h-3 rounded-full bg-[#ccff00] text-black text-[7px]">
                            0
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                        <span>Saved</span>

                        <span className="flex items-center justify-center w-3 h-3 rounded-full border border-gray-500 text-gray-300 text-[7px]">
                            0
                        </span>
                    </div>

                </div>

            </nav>

        </div>
    );
};

export default Navbar;