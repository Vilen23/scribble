"use client";
import React from "react";
import { Allura, Work_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
export const work = Work_Sans({ weight: "500", subsets: ["latin"] });
const alura = Allura({
  weight: "400",
  subsets: ["latin"],
});
export default function Navbar() {
  const router = useRouter();
  const session = useSession();
  const handleLogout = async () => {
    const res = await signOut();
  };
  return (
    <div className="h-[12vh] flex justify-between items-center px-20 ">
      <div>
        <a
          href="/"
          className={`${alura.className} text-5xl cursor-pointer hover:text-black/70`}
        >
          Scribble
        </a>
      </div>
      {!session.data?.user ? (
        <div className="flex gap-4 items-center">
          <div
            onClick={() => router.push("/signin")}
            className={`${work.className} text-[#555664] cursor-pointer group hover:text-[#555664]/90`}
          >
            Log In
            <div className="h-[2px] bg-black w-0 group-hover:w-full transition-all duration-500"></div>
          </div>
          <button className="bg-black text-white rounded-3xl px-3 py-2 text-[14px] flex items-center hover:bg-black/80">
            Sign up
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <div
            className={` ${alura.className} text-[22px]`}
          >
            Hi,
            <span className={`${work.className} text-[18px] `}>
              {" "}
              {session.data.user.name}
            </span>
          </div>
          <button
          onClick={handleLogout}
            className={`${work.className} bg-black text-white rounded-3xl px-3 py-2 text-[14px] flex items-center hover:bg-black/80`}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
