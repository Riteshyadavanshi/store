import  * as z from "zod";



export const emailSchema=z.object({
        mobileNumber:z.string().min(10,{
            message:"invalid number"
        }),
        email:z.string().email({
            message:"invalid email"
        }),
        message:z.string().min(1,{
            message:"please write your message"
        }),

})