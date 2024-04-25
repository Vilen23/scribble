"use client"
import React from 'react'
import { Source_Serif_4 } from 'next/font/google'
import { work } from './Navbar'
export const serif = Source_Serif_4({ weight: '500', subsets: ['latin'] })
const serif2 = Source_Serif_4({ weight: '400', subsets: ['latin'] })    
export default function Hero() {
  return (
    <div className='flex justify-center items-center'>
        <div className='w-[1100px] flex justify-center mt-20 flex-col items-center'>
            <div className={`${serif.className} px-4 py-1 text-md cursor-pointer hover:shadow-sm hover:text-black/70 bg-[#d5c1f0] rounded-2xl`}>Getting Better Daily With It</div>
            <div className={`${serif2.className} text-5xl text-center mt-10`}>
            "Unleash your inner artist with ScribblePlay, where doodles become masterpieces!"
            </div>
            <div className={`${work.className} mt-5 text-[14px] text-center text-[#0d0c22]`}>
            "Grab your digital pen and let creativity flow in a world where every scribble tells a story!"
            </div>
            <div className="mt-10">
                <button className={`${work.className} bg-black px-3 py-3 text-[14px] rounded-3xl hover:bg-black/80 text-white`}>Get Started</button>
            </div>
        </div>
    </div>
  )
}
