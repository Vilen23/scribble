import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { serif } from "./Hero";
import { IoExitOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSession } from "next-auth/react";
interface RoomProps {
  createdBy: {
    createdAt: string;
    id: string;
    name: string;
  };
  room: {
    active: boolean;
    createdAt: string;
    createdBy: string;
    id: string;
    name: string;
  };
  roomUsers: {
    name: string;
    id: string;
  }[];
}

export default function RoomPage() {
    const session = useSession();
  const [room, setRoom] = useState<RoomProps>({
    createdBy: {
      createdAt: "",
      id: "",
      name: "",
    },
    room: {
      active: false,
      createdAt: "",
      createdBy: "",
      id: "",
      name: "",
    },
    roomUsers: [],
  });
  const { roomid } = useParams();

  useEffect(() => {
    const fetchRoomInfo = async () => {
      const res = await axios.get(`/api/room/${roomid[0]}`);
      setRoom(res.data);
    };
    fetchRoomInfo();
  }, []);

  const handleLeaveServer = async () => {

  };
  return (
    <div className="flex justify-center  flex-col w-[100vw] px-[250px]">
      <div className="flex gap-3 items-center">
        <div className={`text-2xl font-bold flex flex-col justify-end w-fit`}>
          <p className={`${serif.className}`}>{room?.room.name}</p>
          <span className="text-xs text-black/80 flex justify-end">
            By-{room.createdBy.name}
          </span>
        </div>
        <IoExitOutline
          onClick={handleLeaveServer}
          className="hover:text-black/50 cursor-pointer"
          size={27}
        />
      </div>
      <div className="flex justify-center w-full gap-10 mt-10">
        <div className="w-[20%] border-r-2 border-t-2">{room.roomUsers.map((user)=>(
            <div className="flex justify-start items-center text- md gap-2 py-2 pl-5 border-b-2">
                <Avatar>
                    <AvatarFallback className="bg-black/10 text-sm" >{user.name[0]}</AvatarFallback>
                </Avatar>
                <p className={`${user.name===session.data?.user?.name?"text-black font-medium cursor-pointer":"cursor-pointer text-black/70 font-normal hover:text-black"}`}>{user.name}</p>
            </div>
        ))}</div>
        <div className="w-[50%] ">Hi2</div>
        <div className="w-[20%]">Hi3</div>
      </div>
    </div>
  );
}
