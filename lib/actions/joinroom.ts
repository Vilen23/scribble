"use server"

import { NEXT_AUTH } from "@/lib/auth"
import prisma from "@/lib/db";
import { getServerSession } from "next-auth"

export const JoinRoom = async(name:string,password:string)=>{
    const session = await getServerSession(NEXT_AUTH);
    if(!session.user){return {error: 'You must be signed in to join a room'}}
    const room = await prisma.room.findFirst({
        where:{
            name,
            password
        }
    })
    if(!room){return {error: 'Invalid Credentials'}}
    const roomUser = await prisma.roomUser.create({
        data:{
            userId:session.user.id,
            roomId:room.id
        }
    })
    return {room,roomUser}
}