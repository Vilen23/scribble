"use client"
import Signin from "@/components/Signin";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default  function Page() {
    const session = useSession();
    useEffect(() => {
        const checkSession = async () => {
          if (session?.data?.user) {
            window.location.href = "/";
          }
        };
        checkSession();
      }, [session?.data?.user]);
  return (
    <Signin/>
  );
}
