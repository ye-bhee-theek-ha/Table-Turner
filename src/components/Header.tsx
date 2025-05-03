"use client";

import React, { useState } from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeButton from './ThemeButton';

function Header( {onClick} : {onClick?: () => void}) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Scroll target not found: #${sectionId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };



  return (
    <div className="pt-[20px] pb-[10px] w-full bg-white">
      
      <div className="w-full grid grid-cols-2 md:grid-cols-3 px-[39px] items-center">
      {/* <div className='hidden md:block'></div> */}
        {/* Left Section */}
        <div className="flex justify-start text-h5 text-black font-comfortaa font-bold">
          Table Turnerr
        </div>


        {/* Center Section (Always Centered) */}
        <div className=" hidden md:flex justify-center">
          <div className='flex items-center gap-[52px] text-normal1 leading-[-0.2px] text-black'>
            <div>
              Solutions
            </div>
            <div>
              Contact
            </div>
            <div>
              FAQ
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-end w-full text-normal3">
          <ThemeButton/>
        </div>

      </div>
    </div>
  )
}

export default Header



