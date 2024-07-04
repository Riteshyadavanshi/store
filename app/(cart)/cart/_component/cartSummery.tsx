 
import { CartItems } from "@/hooks/use-cart";
import { priceFormater } from "@/lib/format";
 
import Link from "next/link";
import { OrderForm } from "./summery-form";
import { User } from "@supabase/supabase-js";

interface CartSummaryProps {
  items: CartItems[],
  user:User|null
}

export const CartSummary =   ({ items,user }: CartSummaryProps) => {
 
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
 const Subtotal=items.reduce((acc,item)=> acc+item.quantity*(item.otherPrice+item.price),0)
 const discount=items.reduce((acc,item)=> acc+item.quantity*item.otherPrice,0)
  return (
    <section className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 id="summary-heading" className="text-lg font-medium text-indigo-900 dark:text-white">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{priceFormater.format(Subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Discount</span>
          </dt>
          <dd className="text-sm font-medium line-through ">
            {priceFormater.format(discount)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {priceFormater.format(total)}
          </dd>
        </div>
      </dl>

      {user ? (
        <OrderForm  />
      ) : (
        <Link
          href={"/login"}
          className="flex justify-center  rounded-sm mt-2  w-full bg-indigo-700 text-white py-2"
        >
          Log in to checkout
        </Link>
      )}
    </section>
  );
};
