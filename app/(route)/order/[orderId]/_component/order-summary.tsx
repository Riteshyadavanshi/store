import { Label } from '@/components/ui/label'
import { Card ,CardContent,CardHeader,CardTitle} from '@/components/ui/card'
import React from 'react'
import { priceFormater } from '@/lib/format'
interface OrderSummaryProps{
    total:number,
    subTotal:number,
    tax:number,
    shipping:number


}
export const  OrderSummary = ({total,tax,shipping,subTotal}:OrderSummaryProps) => {
  return (
     <>
     
     <Card>
            <CardHeader>
            <CardTitle className="text-indigo-900 font-bold justify-center flex ">Order Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between tracking-tighter">
                <Label className="flex text-xl">
                Subtotal
                </Label>
                <h1>{priceFormater.format(subTotal)}</h1>
                </div>
              <div className="flex items-center justify-between tracking-tighter">
                <Label className="flex text-xl">
                shipping
                </Label>
                <h1>{priceFormater.format(shipping)}</h1>
                </div>
              <div className="flex items-center justify-between">
                <Label className="flex text-xl">
                 Tax
                </Label>
                <h1>{priceFormater.format(tax)}</h1>
                </div>
              <div className="flex items-center justify-between">
                <Label className="flex text-xl font-bold">
                 Order Total
                </Label>
                <h1>{priceFormater.format(total)}</h1>
                </div>
            </CardContent>
           </Card>

     </>
  )
}
