"use client";
import { useSession } from "next-auth/react";
import LoginAlert from "./LoginAlert";
import JoinRoomAlert from "./JoinRoomAlerts";
export function JoinRoomButton() {
  const session = useSession();
  if (session.data?.user) {
    return (
      <JoinRoomAlert/>
    );
  }
  return <LoginAlert title="Join Room"/>;
}
