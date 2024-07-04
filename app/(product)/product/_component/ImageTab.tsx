"use client"
import { cn } from '@/lib/utils'
import { Image as Images } from '@prisma/client'
import Image  from 'next/image'
import React, { useState } from 'react'
interface ImageTabProps{
    images:Images[]
}
export const ImageTab = ({images}:ImageTabProps) => {
    const [index,setIndex]=useState(0)

  return (
    <div  className='space-y-3  w-full flex flex-col justify-center'> 
    <div  className='max-w-[300px] lg:max-w-[500px] sm:max-w-[400px]      '>
         <Image src={images[index].imageUrl} 
         width={500}
         height={400}
         alt="product"
        
         className="object-cover h-auto  aspect-square rounded-sm"
            />
          </div>
         <div className=' flex gap-x-2  '>
        { images.map(({imageUrl},i)=>{
          
        return (
            <div  onClick={()=>setIndex(i)} className={cn("border-2 rounded-sm p-[1px] ",index===i?"  border-indigo-600":"border-muted-foreground")} key={imageUrl}>
          <Image src={imageUrl} 
         width={100}
         height={100}
         alt="product"
         className="object-cover aspect-square rounded-sm"
           
            />
            
        </div> )})
            }
         </div>
    </div>
  )
}
