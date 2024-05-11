"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { work } from "./Navbar";
import { serif } from "./Hero";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MakeRoom } from "@/lib/actions/Room";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { roomUserAtom } from "@/states/roomUser";
import axios from "axios";
import { useSession } from "next-auth/react";

interface MakeRoomProps {
  name: string;
  password: string;
}

export default function MakeRoomAlert() {
  const session = useSession();
  const router = useRouter();
  const setRoomUser = useSetRecoilState(roomUserAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [room, setRoom] = useState<MakeRoomProps>({
    name: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateRoom = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/makeRoom/?userId=${session.data?.user.id}`,
      {
        name: room.name,
        password: room.password,
      }
    );
    const roomid = res.data.room?.id;
    setRoomUser(res.data.roomUser);
    router.push(`/room/${roomid}`);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`${work.className} px-3 py-2 rounded-3xl bg-black text-white hover:bg-black/80`}
        >
          Make Room
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`${serif.className} text-center text-2xl`}>
            Set Credentials for your room
          </DialogTitle>
          <DialogDescription
            className={`${work.className} text-center text-sm`}
          >
            Share link with your friends to invite them to your room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center">
            <input
              onChange={(e) => {
                setRoom({ ...room, name: e.target.value });
              }}
              type="text"
              placeholder="Room Name"
              className="rounded-3xl border-2 p-2 text-center"
            />
          </div>
          <div className="relative">
            <input
              onChange={(e) => {
                setRoom({ ...room, password: e.target.value });
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="rounded-3xl border-2 p-2 text-center"
            />
            <button
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-500"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div>
            <button
              onClick={handleCreateRoom}
              className={`${work.className} px-3 py-2 rounded-3xl bg-black text-white hover:bg-black/80`}
            >
              Create Room
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
