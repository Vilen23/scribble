import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { work } from "./Navbar"
  import { useRouter } from "next/navigation"

  
export default function LoginAlert({title}:{title:string}) {
    const router = useRouter();
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className={`${work.className} hover:bg-black/80 bg-black cursor-pointer text-white px-3 py-2 rounded-3xl`}>{title}</div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={`${work.className} text-2xl `}>You need to Log In first</AlertDialogTitle>
            <AlertDialogDescription className='text-sm'>
              In order to Make a room and play the game you first need to Log In.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{
                router.push('/signin')
            }}>Log In</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}
