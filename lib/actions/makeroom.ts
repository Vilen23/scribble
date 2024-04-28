"use server"

import { NEXT_AUTH } from "@/lib/auth"
import prisma from "@/lib/db";
import { getServerSession } from "next-auth"

export const MakeRoom = async(name:string,password:string)=>{
    const session = await getServerSession(NEXT_AUTH);
    if(!session.user){return {error: 'You must be signed in to make a room'}}
    try {
        const room  = await prisma.room.create({
            data:{
                name,
                password,
                createdBy:session.user.id,
            }
        })
        const roomUser = await prisma.roomUser.create({
            data:{
                userId:session.user.id,
                roomId:room.id
            }
        })
        return {room,roomUser}
    } catch (error) {
        return {error: 'Failed to create room'}
    }
}