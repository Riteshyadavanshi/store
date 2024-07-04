"use client";

import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./cartSummery";
import { useEffect, useState } from "react";

import { ActionButton } from "./action-btn";
import { Trash2 } from "lucide-react";
import { CartItemsEmpty } from "./CartItemEmpty";
 
import { Heading } from "@/components/ui/heading";
import { User } from "@supabase/supabase-js";
interface CartPageProps{
  user:User|null
}
export const CartPage = ({user}:CartPageProps) => {
  const cart = useCart();

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="lg:flex px-6 lg:px-10 lg:flex-row  lg:items-center gap-x-10 w-full">
        <div className="flex-1">
          <div className="flex justify-between">
             <div className="  mb-6">
              <Heading title="Shopping Cart"/>
             </div>
            {cart.items.length > 0 && (
              <ActionButton icon={<Trash2 />} onClick={cart.removeAll} />
            )}
          </div>
          <div className="">
            {cart.items.length === 0 && <CartItemsEmpty />}
            <ul>
              {cart.items.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 max-w-[400px]">
          <CartSummary items={cart.items} user={user}/>
        </div>
      </div>
    </>
  );
};

 
