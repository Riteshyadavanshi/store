"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const cancelOrder = async (orderId: string) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status:"canceled"
    },
  });

  revalidatePath("/order");
};
