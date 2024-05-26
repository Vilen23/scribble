"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

interface chatProps  {
  message:string;
  user:{
    name:string,
    id:string
  }
}

export default function Chat(roomId: any) {
  const session = useSession();
  const room = roomId.roomId[0];
  const [message, setMessage] = useState("");
  const [chat,setChat] = useState<chatProps[]>([]);

  const getMessages = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/get/?userId=${session.data?.user.id}&roomId=${room}`
    );
    console.log(res);
    setChat(res.data)
  };

  useEffect(()=>{
  if(session.data?.user.id){
    getMessages();
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event)=>{
      let message;
      try{
        message = JSON.parse(event.data);
        console.log(message);
      }catch(error){
        console.log(error);
        return;
      }
      if(message.type === "chat_message"){
        setChat((prev)=>[...prev,message.msg])
      }
    }
    return ()=>{
      ws.close()
    }
  }
  },[session])

  const handleSendMessage = async (message: string) => {
    console.log("something is happening");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/add/?userId=${session.data?.user.id}&roomId=${room}`,{
          message
        }
      );
      getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-black/40 h-full relative flex flex-col">
      <div className="flex-1 overflow-auto p-2">
        {chat.slice(-14).map((msg, index) => (
          <div key={index} className="flex justify-between items-center mb-2 w-full">
            <p className="text-xs line-clamp-2 w-[60%]">{msg.message}</p>
            <p className="text-sm">~{msg.user.name}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center bg-white border-t-2 border-black pr-2">
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          type="text"
          className="w-full h-10 px-2 focus:ring-0 ring-0 focus:outline-0"
          placeholder="Chat here..."
        />
        <IoSend
          className="cursor-pointer"
          onClick={() => {
            handleSendMessage(message);
            setMessage(""); // Clear input after sending message
          }}
        />
      </div>
    </div>
  );
}
