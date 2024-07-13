import { priceFormater } from '@/lib/format'
import { Item } from '@/lib/types'
import Image from 'next/image'
import React from 'react'
interface OrderItemProps{
    item:Item
}
export const OrderItem = ({item}:OrderItemProps) => {
    
    
  return (
    <>
    <div className='flex gap-x-3 lg:pb-2 border-b-2 border-muted'>
    <div className="h-32 w-32">
    <Image src={item.product.images[0].imageUrl} width={600} height={600} alt="product" className="object-cover aspect-square rounded-sm" />

    </div>
   <div className="flex justify-between w-full lg:w-[50%]">
   <div className="    gap-x-4">
    <h1 className="text-xl font-bold text-indigo-900 dark:text-white">{item.product.name}</h1>
    <h1 className="text-green-400">{priceFormater.format(item.product.price)}</h1>
    <h1>Qtn:<span className="font-bold">{item.quantity}</span></h1>
    <div className=" flex gap-x-3 text-muted-foreground">
    <h1>total:{item.quantity*item.product.price}</h1>
     
     
  </div>
  </div>
  
  </div>
  </div>
  </>
  )
}
