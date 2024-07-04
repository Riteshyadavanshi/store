"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ProductWithImages } from "@/lib/types";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState, useTransition } from "react";
 
interface AddToCartButtonProps {
  product:ProductWithImages ;
 
}

export default function AddToCartButton({
  product,
 
}: AddToCartButtonProps) {
  const [isPending,setIspending]=useState(false)
  const {addItem}=useCart()
   const addToCart=( )=>{
    setIspending(true)
    addItem({...product,quantity:1})
    setIspending(false)
         
   }
  return (
    <div className="flex items-center gap-2 w-full">
      <Button
        className="w-full gap-x-1 flex items-center"
        onClick={addToCart}
         
        variant={"custome"}
      >
        Add to Cart
        {isPending ? (
          <Loader2 className="w-4 h-4 text-muted animate-spin " />
        ) : (
          <ShoppingCart />
        )}
      </Button>
    </div>
  );
}
