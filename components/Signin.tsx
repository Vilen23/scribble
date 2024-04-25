"use client";
import React, { useEffect, useState } from "react";
import { work } from "@/components/Navbar";
import { serif } from "@/components/Hero";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SigninProps {
  name: string;
  password: string;
}

export default function Signin() {
    const router = useRouter();
  const [user, setUser] = useState<SigninProps>({ name: "", password: "" });
  const session = useSession();
  const handleLogin = async () => {
    console.log("Logging in...");
    const res = await signIn("credentials", {
        redirect: true,
        name: user.name,
        password: user.password,
        callbackUrl: "/",
    });
    console.log(res);
  };
  useEffect(()=>{
    if(session.data?.user){
        router.push("/")
    }
  },[session])
  

  return (
    <div className="flex justify-center items-center">
      <div className="w-[800px] flex flex-col items-center">
        <div className={` ${serif.className} text-5xl text-center mt-10`}>
          "Welcome back to ScribblePlay!"
        </div>
        <div
          className={`text-[14px] text-center text-[#0d0c22] mt-5 ${work.className}  `}
        >
          "Let's get you back to creating and sharing your doodles with the
          world!"
        </div>
        <div className="mt-10">
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            autoComplete="off"
            type="text"
            placeholder="Email"
            className="px-3 py-3 w-[300px] rounded-3xl border-2 border-[#0d0c22] focus:outline-none focus:border-[#0d0c22]"
          ></input>
        </div>
        <div className="mt-5">
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            autoComplete="off"
            type="password"
            placeholder="Password"
            className="px-3 py-3 w-[300px] rounded-3xl border-2 border-[#0d0c22] focus:outline-none focus:border-[#0d0c22]"
          ></input>
        </div>
        <div className="mt-5">
          <button
            onClick={handleLogin}
            className={` ${work.className} bg-black w-[100px]  px-3 py-3 text-[14px] rounded-3xl hover:bg-black/80 text-white`}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
