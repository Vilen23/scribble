import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest, { params }: { params: { roomid: string } }) => {
    const session = await getServerSession(NEXT_AUTH);
    if(!session.user) return new NextResponse("You must be signed in to make a room",{status:401});
    const room = await prisma.room.findFirst({
        where:{
            id:params.roomid
        }
    })
    if(!room) return new NextResponse("Room not found",{status:404});
    const roomUser = await prisma.roomUser.findMany({
        where:{
            roomId:room.id
        }
    })
    const roomUsers = await prisma.user.findMany({
        where:{
            id:{
                in:roomUser.map(user=>user.userId)
            }
        }
    
    })
    const createdBy = await prisma.user.findFirst({
        where:{
            id:room.createdBy
        }
    })
    return NextResponse.json({ room, roomUsers,createdBy});
}