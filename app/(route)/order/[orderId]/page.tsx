import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/db";
import { priceFormater } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { cache } from "react";
import { OrderItem } from "./_component/items";
import { StatusBar, statusValue } from "./_component/statusBar";
import { notFound } from "next/navigation";
import { OrderSummary } from "./_component/order-summary";
import Address from "./_component/Address";
interface OrderDetailsProps {
  params: {
    orderId: string;
  };
}
 
const getOrder = cache(
  async (orderId: string) =>
    await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    })
);
const OrderDetails = async ({ params: { orderId } }: OrderDetailsProps) => {
  const  order = await getOrder(orderId);
   if(!order){
   return notFound()
   }
 
  return (
    <>
      <div className={cn("min-h-screen w-screen lg:p-10 p-2  space-y-2  ")}>
        
        <StatusBar status={order.status as statusValue} statusDate={order.updatedAt}/>
        <div className="  lg:flex p-4 lg:p-8 space-y-2 gap-x-2 lg:mx-[300px]" >
            <div className=" space-y-3 w-full  ">
               
              {
                 order?.items.map((item)=><OrderItem  item={item} key={item.id}/>)
              }
             
            </div>
        
      </div>
      <div className=" lg:mx-[300px]">
           <OrderSummary total={order.total} subTotal={order.total} shipping={0} tax={0} />
           <Address address={order.address} pinCode={order.pinCode}/>
        </div>
    </div>
    </>
  );
};

export default OrderDetails;
