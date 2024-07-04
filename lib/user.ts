
import {prisma} from "@/lib/db"
export const getUserByMobileNumber=async(mobileNumber:string|undefined)=>{
    if(mobileNumber){
   return await prisma.user.findFirst({
     where:{
        mobileNumber
     }
   })
}
return null
}