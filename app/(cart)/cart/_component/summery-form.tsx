"use client";
import { codOrder } from "@/action/order";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { orderSchema } from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
 
import { Loader2 } from "lucide-react";
import Script from "next/script";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export const OrderForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      address: "",
      mobileNumber: "",
      pinCode: "",
      email: "",
      paymentType: "online",
    },
  });
  const cart = useCart();
  const total = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cartItems= cart.items.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
  }))
  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    try {
      setIsPending(true);
      const validateValues = orderSchema.parseAsync(values);
      if (!validateValues) {
        throw new Error("invalid data entered");
      }
      const { name, mobileNumber, address, pinCode, email, paymentType } =
        values;
      if (paymentType == "online") {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            mobileNumber,
            address,
            pinCode,
            total,
            email,
            cartItems 
          }),
        });

        const order = await res.json();

        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: order.amount,
          name,
          description: "payment",
          order_id: order.id,

          prifill: {
            name,
            email,
          },
        };
        cart.removeAll();
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } else {
        const cartItems= cart.items.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
        }))
         await codOrder(values,cartItems,total).then(data=>{
             cart.removeAll()
             toast.success("order placed")
         })

      }
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      setIsPending(false);
      setIsOpen(false);
    }
  };
  
  return (
    <>
      <Dialog open={isOpen}  >
        <DialogTrigger className="mt-6" asChild>
          <Button
            disabled={!cart.items.length}
            className="w-full"
            onClick={() => setIsOpen(true)}
          >
            Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Shipping form</DialogTitle>
            <DialogDescription>please fill all the field </DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3    "
              >
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isPending}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <Input placeholder="john doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isPending}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  name="mobileNumber"
                  control={form.control}
                  disabled={isPending}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="mobileNumber"
                            className="appearance-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="address"
                  disabled={isPending}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <Input placeholder="address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pinCode"
                  disabled={isPending}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl>
                          <Input placeholder="pin code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentType"
                  disabled={isPending}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormControl  >
                        
                             <div  className="space-y-2">
                               <div >
                                
                                 <Label  htmlFor="cod" className="flex w-full border border-mutedforeground p-4 justify-between rounded-sm    ">
                                  <span>cash on delivery </span>
                                    <Input id="cod" type="radio" className="text-3xl p-3 w-6 h-6   " {...field}  value={"cod"}/> 
                                    </Label>
                                </div>
                                <div>
                                 <Label  htmlFor="online" className="flex w-full border border-mutedforeground p-4 justify-between rounded-sm    ">
                                  <span>online </span>
                                    <Input id="online" type="radio" className="text-3xl p-3 w-6 h-6   " {...field}  value={"online"}  defaultChecked/> 
                                    </Label>
                               </div>
                                
                                
                               
                             </div>

                
                         
                       
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <div className="w-full flex justify-end">
                  <Button type="submit" size={"lg"} disabled={isPending}>
                    {isPending && (
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    )}
                    place order
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};
