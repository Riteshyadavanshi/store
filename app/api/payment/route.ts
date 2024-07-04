import { Orders } from "razorpay/dist/types/orders";
import { razorpay } from "./Razorpay.config";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
 
import {   getUserByMobileNumber } from "@/lib/user";
 
import { getUser } from "@/action/auth/auth";
 type item={
    productId:string,
    quantity:number
 }
export const POST = async (req: Request) => {
  try {
    
    const {
      data: { user },
    } = await getUser()
    if(!user){
      throw new NextResponse("not logged in ")
    }
    const isValidUser=await getUserByMobileNumber(user.phone)

    if(!isValidUser){
      return new NextResponse("user is not authentic")
    }
    const { total, name, email, address, mobileNumber,pinCode,cartItems } =
      await req.json();

    const newOrder = await prisma.order.create({
      data: {
        name,
        email,
        address,
        mobileNumber,
        isPaid: false,
        total,
        pinCode,
        user:{
          connect:{
            id: isValidUser.id
          }
        },
        items: {
          create: cartItems.map((item:item) => ({
             quantity:item.quantity,
              product:{
                connect:{
                   id:item.productId
                }
              }
            })),
          
        },
      },
    });
    if (!newOrder) {
      throw new  NextResponse("something went wrong");
    }
    const currency = "INR";
    const payment_capture = 1;
    const option = {
      amount: total * 100,
      currency,
      payment_capture,
      notes: {
        orderId: newOrder.id,
      },
    };
    const order = await razorpay.orders.create(option);
      console.log(order)
    return NextResponse.json(order, { status: 200 });
  } catch (err) {
     console.log(err)
    return NextResponse.json({ message: err }, { status: 400 });
  }
};
