"use client";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CartBag = () => {
  const { items } = useCart();
  return (
    <Link href={"/cart"}>
      <div className="w-10 relative h-10 flex justify-center items-center">
        {items.length > 0 && (
          <div className="absolute w-6 h-6 text-white -top-4 -right-1  bg-destructive rounded-full justify-center items-center flex ">
            {items.length}
          </div>
        )}
        <ShoppingBag className="w-6 h-6" />
      </div>
    </Link>
  );
};
