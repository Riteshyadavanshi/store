"use server";

import { createClient } from "@/lib/supabaseClient/supabaseServer";
import { prisma } from "@/lib/db";

export const getOtp = async (mobile: string) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: `+91${mobile}`,
    });
   
    if (error) throw new Error("something went wrong ");

    return data;
  } catch (error) {
    throw error;
  }
};
export const verifyOtp = async (otp: string, mobileNumber: string) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token: otp,
      phone: `+91${mobileNumber}`,
      type: "sms",
    });
    if (error) {
      throw error;
    }
    if (!data.user?.phone) {
      throw new Error("something went wrong");
    }
    const isUser = await prisma.user.findFirst({
      where: {
        mobileNumber: data.user.phone,
      },
    });
    if (isUser) {
      return;
    }
    await prisma.user.create({
      data: {
        mobileNumber: data.user.phone,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const logOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

export const getUser = async () => {
  const supabase = await createClient(true);
  return supabase.auth.getUser();
};
