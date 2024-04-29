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

export const LeaveRoom = async(roomId:string,roomUserid:string)=>{
    const session = await getServerSession(NEXT_AUTH);
    if(!session.user){return {error: 'You must be signed in to leave a room'}}
    try {
        const removeUser = await prisma.roomUser.delete({
            where:{
                id:roomUserid,
            }
        })
        if(!removeUser){return {error: 'User not found'}}
        const roomUser = await prisma.roomUser.findMany({
            where:{
                roomId
            }
        })
        // console.log(roomUser)
        if(roomUser.length === 0){
            const deleteRoom = await prisma.room.delete({
                where:{
                    id:roomId
                }
            })
            if(!deleteRoom){return {error: 'Room not found'}}
        }
        const roomUsers = await prisma.user.findMany({
            where:{
                id:{
                    in:roomUser.map(user=>user.userId)
                }
            }
        
        })
        return {roomUsers}
    } catch (error) {
        console.log(error);
    }
}