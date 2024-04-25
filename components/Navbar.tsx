import React from "react";
import { Allura, Work_Sans } from "next/font/google";
export const work = Work_Sans({ weight: "500", subsets: ["latin"] });
const alura = Allura({
  weight: "400",
  subsets: ["latin"],
});
export default function Navbar() {
  return (
    <div className="h-[12vh] flex justify-between items-center px-20 ">
      <div>
        <div
          className={`${alura.className} text-5xl cursor-pointer hover:text-black/70`}
        >
          Scribble
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <a
          className={`${work.className} text-[#555664] cursor-pointer group hover:text-[#555664]/90`}
        >
          Log In
          <div className="h-[2px] bg-black w-0 group-hover:w-full transition-all duration-500"></div>
        </a>
        <button className="bg-black text-white rounded-3xl px-3 py-2 text-[14px] flex items-center hover:bg-black/80">
          Sign up
        </button>
      </div>
    </div>
  );
}
