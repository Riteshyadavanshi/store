
import * as z from 'zod'

  
export const loginSchema=z.object({
    mobileNumber :z.string().min(1,{
        message:"mobile number is required"
    }),
  
})
export const otpSchema=z.object({
    otp:z.string()
  
})