"use client"
 
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowDown, FilterIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; 

export const Filter =  ( ) => {
 
  
  const router=useRouter()
  const [isMount,setIsMount]=useState(false)
  useEffect(()=>{
     setIsMount(true)
  },[])
  if(!isMount){
    return null
  }
  return (
    <>
    <div className="w-full flex justify-between px-2 lg:px-10">
      
      <div>
        <CustomeDropDown icon={<ArrowDown className="w-4 h-4"/>} label="sort">
           <DropdownMenuItem onClick={()=>router.push(`?price=asc`)}>price:Low to High</DropdownMenuItem>
           <DropdownMenuItem onClick={()=>router.push(`?price=desc`)}>price:High to Low</DropdownMenuItem>
           
        </CustomeDropDown>
        </div>
    </div>
    </>
  );
};

interface CustomeDropDownProps{
   children:React.ReactNode,
   label:string,
   icon:React.ReactElement
}
const  CustomeDropDown=({children,label,icon}:CustomeDropDownProps)=>{
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="flex gap-x-2">
     <Button variant={"outline"}> {icon}{label}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}