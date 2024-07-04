 "use client"
 
import { Loader } from "@/components/ui/loader"

 const Loading=()=>{
  return (
     <>
       <div  className=" min-h-screen min-w-screen flex justify-center items-center">
           <Loader/>
      
        </div>
     </>
  )
}
export default Loading