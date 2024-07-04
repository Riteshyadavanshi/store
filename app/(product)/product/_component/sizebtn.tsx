 "use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
 
import React from 'react'
 
export const SizeBtn  = () => {
     const searchParams=useSearchParams()
     const selectedSize=searchParams.get("size")||"md"
   
  
 
    const size=["s","md","xl"]
  return (
       <>
        <div className='flex flex-col'>
          <div >
            <h1>Size</h1>
            <div className='flex gap-4'>
            {
              size.map((label)=>
              <Link href={`?size=${label}`} key={label} scroll={false}>
              
                <Button  variant={"ghost"} className={cn(' border-[1px]  border-muted-foreground',selectedSize===label&&"border-blue-500 border-2")} size={"lg"}>
                  {label}
                </Button>
              </Link>
            )}
            </div>
          </div>
           
          
        </div>
       </>
  )
}

 