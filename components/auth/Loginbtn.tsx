"use client"

interface LoginButtonProps{
    children:React.ReactNode,
    mode?:"modal"|"redirect",
    asChild?:boolean
}

import React from 'react'
import { Button } from '../ui/button'
import {useRouter } from "next/navigation"

export const Loginbtn = ({
  children,
  asChild,
  mode="redirect"

}:LoginButtonProps) => {
   const router =useRouter()
    const onClick=()=>{
       router.push("/auth/login")
    }

    if(mode=="modal"){
        return (
            <p>Todo-implement</p>
        )
    }
  return (
     <>
      <span   onClick={onClick} className='cursor-pointer'>
        {children}
      </span>
     </>
  )
}

