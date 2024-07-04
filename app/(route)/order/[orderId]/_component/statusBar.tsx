import { Heading } from '@/components/ui/heading'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import React from 'react'
  
export type statusValue="order placed"|"processing"|"shipped"|"deliverd"|"canceled"
interface StatusBarProps{
      status:statusValue,
      statusDate:Date
}
export const StatusBar = ({status,statusDate}:StatusBarProps) => {
  
    const statusValue:Record<statusValue,number>={
         "order placed":10,
        "processing":40,
        "shipped":70,
        "deliverd":100,
        "canceled":100
         
    }
     
  return (
    <div className=' lg:mx-[300px]  p-2 space-y-2 border-2 border-muted  rounded-sm'> 
        <Heading title='Status Bar'/>
      <h1 className='text-xl'>{`${status} on ${format(statusDate,"MMMM dd,yyyy")}`}</h1>
         <Progress value={statusValue[status]} className='bg-gray-200 h-2' fill={status!="canceled"?"":"bg-destructive"}/>
      <div className='w-full flex justify-between text-sm'>
         <p>order Placed</p>
         <p>Processing</p>
         <p>Shipped</p>
         <p className={cn(status=="canceled"&& "text-destructive")}>{status=="canceled"?"canceled":"Deliverd"}</p>
      </div>

    </div>
  )
}
