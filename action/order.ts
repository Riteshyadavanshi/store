"use server";
import { CartItems } from "@/hooks/use-cart";
import { prisma } from "@/lib/db";
import { orderSchema } from "@/schemas/order";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getUser } from "./auth/auth";
import { getUserByMobileNumber } from "@/lib/user";
export const cancelOrder = async (orderId: string) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "canceled",
    },
  });

  revalidatePath("/order");
};
type item = {
  productId: string;
  quantity: number;
};
export const codOrder = async (
  order: z.infer<typeof orderSchema>,
  cartItems: item[],
  total: number
) => {
  try {
    const {
      data: { user },
    } = await getUser();
    if (!user) {
      throw new Error("not logged in ");
    }
    const isValidUser = await getUserByMobileNumber(user.phone);
    if (!isValidUser) {
      return new Error("user is not authentic");
    }
    const { name, email, address, mobileNumber, pinCode ,paymentType} = order;

    await prisma.order.create({
      data: {
        name,
        email,
        address,
        paymentType,
        mobileNumber,
        isPaid: false,
        total,
        pinCode,
        user: {
          connect: {
            id: isValidUser.id,
          },
        },
        items: {
          create: cartItems.map((item: item) => ({
            quantity: item.quantity,
            product: {
              connect: {
                id: item.productId,
              },
            },
          })),
        },
      },
    });
  } catch (err) {
    throw err;
  }
};
