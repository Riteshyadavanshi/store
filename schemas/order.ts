import * as z from "zod"
 
export const orderSchema=z.object({
    name:z.string().min(1,{
        message:"name is required"
    }),
    address:z.string( ).min(1,{
        message:"address is required"
    }) ,
     
    email:z.string().email({
        message:"invalid email"
    }),
    mobileNumber:z.string().min(10,{
        message:"invalid number"
    }).max(10,{
        message:"number can't be more than 10 "
    }) ,
    pinCode:z.string().min(1,{
        message:"pin code required"
    })   
})