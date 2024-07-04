import React from "react";
import { EmailSender } from "./emailSender";

export const Banner = () => {
  return (
    <div className="py-3 bg-[#f3faf8]  mb-1 text-[#85bba7] flex flex-col lg:text-3xl   lg:flex-row w-screen items-center     justify-center lg:gap-x-2 gap-x-1">
      <p className="flex   font-bold  lg:tracking-normal tracking-tight     ">
        Searching for something unique contact us
      </p>

      <EmailSender />
    </div>
  );
};
