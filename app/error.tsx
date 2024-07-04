 
"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

 const Error = () => {
    const router=useRouter()
  return (
    <section className="bg-white dark:bg-gray-900 ">
    <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">500 error</p>
            
            <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry,some internal server error occurred please go to home page</p>

            <div className="flex items-center mt-6 gap-x-3">
                
               
                <Button onClick={()=>router.push("/")} >
                    Take me home
                </Button>
                 
            </div>
        </div>

        <div className="  lg:mt-0 p-10">
            <Image width={500} height={500} src={"/error2.svg"} className="  w-60 h-60 object-cover aspect-square "  alt="error"/>
        </div>
    </div>
</section>
  )
}

export default Error
