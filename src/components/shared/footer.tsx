import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <div className="border-t border-[#15171b] bg-[#0b0c0e] h-[60px] sticky bottom-0">

            <footer className="flex justify-between items-center h-full px-15">


                <div className="flex items-center gap-1">
                    <Image
                        src={logo}
                        alt="Fitlog"
                        className="w-5 h-5"
                    />

                    <span className="text-[10px] font-bold text-white">
                        FITLOG
                    </span>
                </div>


                <p className="text-[7px] text-gray-500">
                    © 2026 Fitlog — Workout Library. Train hard, log honest.
                </p>

            </footer>

        </div>
    );
};

export default Footer;