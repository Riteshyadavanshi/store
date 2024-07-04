
import { NextResponse } from "next/server"
 
import {prisma} from '@/lib/db'
import crypto from "crypto"

 
 
 
export const POST=async(req:Request)=>{
    
     
    const body  =await req.json()
    const payment=body.payload.payment.entity
    const headers=await req.headers
    const signature = headers.get('x-razorpay-signature');
  
    try {
      const expectedSignature = crypto.createHmac('sha256', "12345")
        .update(JSON.stringify(body))
        .digest('hex');
  
      if (signature === expectedSignature) {
         
        
        if( payment.status==="captured"){
           if(payment.captured){
            console.log("inter",payment.notes)
            const data=  await prisma.order.update({
                where:{
                  id:payment.notes.orderId
                },
                data:{
                  isPaid:true
                } 
                
               })
           }
        }
         
       
        return  new NextResponse('Webhook Received Successfully',{status:200});
      } else {
         
        console.error('Invalid webhook signature');
        return new NextResponse(null,{status:400})
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      new NextResponse("server error",{status:400})
    }
    

}