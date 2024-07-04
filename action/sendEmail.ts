"use server"
import { emailSchema } from "@/schemas/email"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import { MailOptions } from "nodemailer/lib/sendmail-transport"
import * as z from "zod"

export const sendEmail=async(values:z.infer<typeof emailSchema>)=>{
 const connect=nodemailer.createTransport({
     port:23232,
     host:"",
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