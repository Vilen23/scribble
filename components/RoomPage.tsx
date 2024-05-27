import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { serif } from "./Hero";
import { IoExitOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { roomUserAtom } from "@/states/roomUser";
import Canvas from "./Canvas";
import Chat from "./Chat";
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
  const router = useRouter();
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
  const [roomUser, setRoomUser] = useRecoilState(roomUserAtom);

  // if(!session?.data?.user.id){
  //   router.push("/")
  // }

  useEffect(() => {
    const fetchRoomInfo = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/getRoom/?roomId=${roomid[0]}&userId=${session.data?.user.id}`
      );
      setRoom(res.data);
    };
    if (session.data?.user.id) fetchRoomInfo();
  }, [session.data?.user.id,roomid]);

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
    ws.onmessage = function (event) {
      let message;
      try {
        message = JSON.parse(event.data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        return;
      }
      if (message.type === "user_joined") {
        setRoom((prevRoom) => ({
          ...prevRoom,
          roomUsers: [...prevRoom.roomUsers, message.user],
        }));
      }
      if (message.type === "user_left") {
        setRoom((prevRoom) => ({
          ...prevRoom,
          roomUsers: prevRoom.roomUsers.filter(
            (user) => user.id !== message.user.id
          ),
        }));
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleLeaveServer = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/leaveRoom/?userId=${session.data?.user.id}`,
        {
          roomId: room.room.id,
          roomUserId: roomUser.id,
        }
      );
      setRoomUser(null);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center  flex-col w-[100vw]">
      <div className="flex gap-3 items-center pl-10 md:px-[200px]">
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
        <div className="border-r-2 border-t-2 hidden md:flex">
          <div className="w-[12vw]">
          {room.roomUsers.map((user) => (
            <div
              className="flex justify-start items-center text- md gap-2 py-2 pl-5 border-b-2"
              key={user.id}
            >
              <Avatar>
                <AvatarFallback className="bg-black/10 text-sm">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <p
                className={`${
                  user.name === session.data?.user?.name
                    ? "text-black font-medium cursor-pointer text-sm max-w-full"
                    : "cursor-pointer text-black/70 font-normal hover:text-black text-sm max-w-full"
                }`}
              >
                {user.name === session.data?.user?.name
                  ? `${user.name}(You)`
                  : `${user.name}`}
              </p>
            </div>
          ))}
          </div>
        </div>
 
        <div className="md:flex-row flex flex-col justify-center items-center gap-3">
        <div className="w-[80vw] md:w-[40vw]">
          <Canvas roomId={roomid}/>
        </div>
        <div className="w-[60vw] md:w-[20vw]">
          <Chat roomId={roomid}/>
        </div>
        </div>
      </div>
    </div>
  );
}
