"use server"
import { emailSchema } from "@/schemas/email"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import { MailOptions } from "nodemailer/lib/sendmail-transport"
import * as z from "zod"

export const sendEmail=async(values:z.infer<typeof emailSchema>)=>{
 const transport=nodemailer.createTransport({
      service:"gmail",
     auth:{
        user:"",
        pass:""
     }
 })
 const option:MailOptions={
   
    from:"",
    to:"",
    html:""
 }

 
 
  

}