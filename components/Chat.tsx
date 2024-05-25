"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Chat(roomId: any) {
  const session = useSession();
  const room = roomId.roomId[0];
  const [message, setMessage] = useState("");
  const getMessages = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/get/?userId=${session.data?.user.id}&roomId=${room}`
    );
    console.log(res);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleSendMessage = async (message: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/add/?userId=${session.data?.user.id}&roomId=${room}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-black h-full relative">
      <div className="absolute bottom-0 w-full">
        <input
          onClick={() => {
            handleSendMessage(message);
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
          className="border-t-2 border-black/50 w-full h-10 px-2"
          placeholder="Chat here"
        />
      </div>
    </div>
  );
}
