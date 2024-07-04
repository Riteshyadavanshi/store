import React from 'react'
import {
    Sheet,
    SheetContent,   
    SheetTrigger,
     
  } from "@/components/ui/sheet"
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
  interface SideBarWrapperProps{
     label:string,
     children:React.ReactNode,
     className?:string,
     icon?:React.ReactElement
  }
export const SideBarWrapper = ({
    label,
    children,
    className,
    icon
} :SideBarWrapperProps) => {
  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button variant={"outline"} className={cn(className)}>
        {icon}
        {label}
        </Button>
    </SheetTrigger>
   
 
    <SheetContent>
      {children}
    </SheetContent>
     
  </Sheet>
  )
}
