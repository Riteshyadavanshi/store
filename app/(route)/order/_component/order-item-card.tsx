import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { orderWithItems } from '@/lib/types'
import { priceFormater } from '@/lib/format'
import { cn } from '@/lib/utils'
import {CancelOrderBtn} from './CancelOrderBtn'
import { Button } from '@/components/ui/button'
  import {format} from "date-fns"
interface OrderItemCardProps{
      order:orderWithItems,
      
}
export const  OrderItemCard = ({order }:OrderItemCardProps) => {
    const {id,total,items,status,name,updatedAt,paymentType}=order
      
  return (
     <>
     <div className="flex space-x-2 bg-backgroun  border-b-[1px] pb-2  "  >
            <div className="h-32 w-32  ">
              <Image
                src={items[0].product.images[0].imageUrl}
                width={400}
                height={400}
                alt="product"
                className="object-cover rounded-sm object-center aspect-square"
              />
            </div>
            <div className=" lg:flex  flex-1 justify-between space-y-3 lg:px-2 px-1">
              <div className="space-y-3">
                <h1>{name}</h1>
                <h1 className="text-green-500">{priceFormater.format(total)}</h1>
                <h1 className={cn("text-green",status=="canceled"&&"text-destructive")}>{`${status} on ${format(updatedAt, "MMMM dd ,yyyy")}`}</h1>
                <h1 className={cn("text-green",status=="canceled"&&"text-destructive")}>{paymentType=="cod"?"cash on delivery":"online"}</h1>
              </div>
              <div>
                <div className='flex  lg:flex-col lg:gap-y-2 justify-between  '>
                <Link
                  href={`/order/${id}`}
                  
                >
                  <Button  variant={"outline"}size={"sm"}>view details</Button>
                </Link>
                 { (status=="order placed") &&<CancelOrderBtn orderId={id}/>}
                </div>
              </div>
            </div>
            </div>
     </>
  )
}
