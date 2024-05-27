"use client";
import { useSession } from "next-auth/react";
import LoginAlert from "./LoginAlert";
import MakeRoomAlert from "./MakeRoomAlert";
export function MakeRoomButton() {
  const session = useSession();
  if (session.data?.user) {
    return (
      <MakeRoomAlert/>
    );
  }
  return <LoginAlert title="Make Room"/>;
}
