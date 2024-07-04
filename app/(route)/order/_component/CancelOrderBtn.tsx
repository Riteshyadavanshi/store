"use client";
import { cancelOrder } from "@/action/order";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { SubmitBtn } from "@/components/submitBtn";

interface CancelOrderBtnProps {
  orderId: string;
}

export const CancelOrderBtn = ({ orderId }: CancelOrderBtnProps) => {
  const handleCancelOrder = () => {
    cancelOrder(orderId)
      .then((data) => toast.success("order canceled"))
      .catch((err) => toast.error("something went wrong"));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="mx-2">
        <div>
          <h1 className="text-2xl font-semibold">Cancel Order</h1>
          <p className="text-muted-foreground">Are you sure to cancel order</p>
          <div className="flex justify-end items-center gap-10 mt-3">
            <AlertDialogCancel>cancel</AlertDialogCancel>
            <form action={handleCancelOrder}>
              <SubmitBtn /> 
            </form>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
