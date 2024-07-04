"use client";
import { useState, useTransition } from "react";
import CardWrapper from "./CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, otpSchema } from "@/schemas/auth";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
 
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getOtp, verifyOtp } from "@/action/auth/auth";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobileNumber: "",
    },
  });
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setMobileNumber(values.mobileNumber);

    startTransition(() => {
      getOtp(values.mobileNumber)
        .then((data) => {
          toast.success("Otp sent on your numbrer");
          setIsOtpSend(true);
        })
        .catch((err) => toast.error("something went error"));
    });
  };

  const onVerify = ({ otp }: z.infer<typeof otpSchema>) => {
    startTransition(() => {
      verifyOtp(otp, mobileNumber)
        .then((data) => {
          toast.success(" otp verified ");
          router.push("/");
        })
        .catch((err) => toast.error("something went error"));
    });
  };
  return (
    <CardWrapper>
      {!isOtpSend && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="">
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="mobileNumber"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
             
            <Button
              disabled={isPending}
              variant={"default"}
              className="w-full"
              type="submit"
            >
              {isPending && <Loader2 className={"h-4 w-4 mr-2 animate-spin"} />}
              {"Get otp"}
            </Button>
            
                <p className="tracking-tighter" >By signing in ,you agree to our <Link href={"/privacy-policy"} className="text-blue-500 underline">Terms of Service</Link></p>
             
          </form>
        </Form>
      )}
      {isOtpSend && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onVerify)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Otp"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>

            <Button
              disabled={isPending}
              variant={"default"}
              className="w-full"
              type="submit"
            >
              {isPending && <Loader2 className={"h-4 w-4 mr-2 animate-spin"} />}
              {isOtpSend ? "verify" : "Get otp"}
            </Button>
            <p className="tracking-tighter" >By signing in ,you agree to our <Link href={"/privacy-policy"} className="text-blue-500 underline">Terms of Service</Link></p>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};
