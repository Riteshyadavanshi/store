"use client";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { emailSchema } from "@/schemas/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { SubmitBtn } from "../submitBtn";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { sendEmail } from "@/action/sendEmail";

export const EmailSender = () => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      mobileNumber: "",
      message: "",
      email: "",
    },
  });
  const handleAction = (value: z.infer<typeof emailSchema>) => {
    console.log(value);
    sendEmail(value);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <span className="underline text-2xl text-black font-extrabold">
          click here
        </span>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)}>
            <div className="space-y-2 p-2">
              <div className="flex justify-center">
                {" "}
                <Heading title="Contact us" />
              </div>
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <Input placeholder="mobile no" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <Input
                          maxLength={200}
                          placeholder="products you looking for "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <div className="flex justify-end">
                <Button>Send </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
