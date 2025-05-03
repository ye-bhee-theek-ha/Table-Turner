"use client";

import React, { useState } from "react";

import {motion} from "framer-motion";

function ThemeButton({text = "Book a Demo", className, textClassName}:{text?: string, className?: string, textClassName?: string}) {

    const Arrow_full = () => {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
            <path d="M15.1667 9.49978L9.42291 13.0975L3.04716 17.0915L0 19V0L3.04716 1.90849L9.42291 5.90206L15.1667 9.49978Z" fill="#1B1B1B"/>
            </svg>
        )};

    const Arrow_half = () => {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
            <path d="M15.1667 9.49978L0 19V15.0064L8.79091 9.49978L0 3.99356V0L15.1667 9.49978Z" fill="#1B1B1B"/>
            </svg>
        )};

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`h-[40px] w-[170px] overflow-hidden flex items-center bg-black rounded-[8px] text-white relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute w-full h-full bg-gradient-to-r from-primary/25 to-primary/0 group-hover:from-primary/35 group-hover:to-primary/15 transition-all duration-300" />

      <div className="p-1 flex h-full aspect-square" />

      <div className="">
        <div className="absolute z-10 left-[5%] top-[50%] translate-y-[-50%]">
          <Arrow_full />
        </div>

        <div className="absolute z-10 left-[11%] sm:left-[10%] group-hover:left-[13%] transition-all duration-300 top-[50%] translate-y-[-50%] delay-200">
          <Arrow_half />
        </div>

        <div className="absolute z-10 left-[11%] sm:left-[10%] group-hover:left-[20%] transition-all duration-300 top-[50%] translate-y-[-50%] delay-200">
          <Arrow_half />
        </div>

        <div className="hidden sm:block absolute z-10 left-[10%] group-hover:left-[27%] transition-all duration-300 top-[50%] translate-y-[-50%] delay-200">
          <Arrow_half />
        </div>
      </div>

      <motion.div
        className="p-[2px] flex absolute top-0"
        initial={{ aspectRatio: 1 / 1, height: "100%" }}
        animate={{
          width: isHovered ? "100%" : "auto",
          height: "100%",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="bg-primary rounded-[6px] overflow-hidden h-full w-full relative items-center flex justify-center">
          <div className="absolute w-full h-full bg-gradient-to-b from-white/25 to-50% to-white/0" />
        </div>
      </motion.div>

      <div className={`w-full h-full flex items-center justify-center text-center z-5 group-hover:translate-x-2 transition-all duration-300 ${textClassName}`}>
        {text}
      </div>
    </div>
  );
}

export default ThemeButton;
