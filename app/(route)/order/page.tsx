 
import { prisma } from "@/lib/db";

import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { OrderItemCard } from "./_component/order-item-card";
 
import {  getUserByMobileNumber } from "@/lib/user";
import { getUser } from "@/action/auth/auth";
 

const getOrders = cache(async (id: string) => {
  return await prisma.order.findMany({
    where: {
      userId: id,
       OR:[{isPaid:true},{paymentType:"cod"}]
    },
     orderBy:{
      createdAt:"desc"
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
  });
});
const Order = async () => {
  const {
    data: { user },
  } = await getUser()
   
  const IsUser = await getUserByMobileNumber(user?.phone);
  if (!IsUser) {
    return <p>you have not access this page </p>;
  }

  const orders = await getOrders(IsUser.id);
  
  return (
    <>
      <div className="min-h-screen  w-screen p-2 pt-6 space-y-2">
        <h1 className="text-3xl justify-center flex w-full text-indigo-900 dark:text-white font-bold">
          My Orders
        </h1>
        <div className="  lg:mx-[300px] space-y-2 ">
          { orders.length > 0  &&
             orders.map((order) => (
              <OrderItemCard key={order.id} order={order} />
            ))  }
          {!orders.length && (
            <div className=" flex flex-col space-y-4 space w-full justify-center p-10  items-center">
              <div>
                <Image
                  src={"/empty.png"}
                  width={500}
                  height={500}
                  alt="empty"
                  className="max-w-[300px] object-cover aspect-square"
                />
              </div>
              <Link
                href={"/"}
                className="bg-indigo-900 text-white p-2 rounded-sm"
              >
                See Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
