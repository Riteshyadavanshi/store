 "use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'



const NotFoundPage =  () => {
  
  return (
    <div className="h-[65%] w-screen  mt-[180px] bg-gray-50 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-[#3f3d56] font-dark font-extrabold mb-8">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry we couldnt find the page youre looking for
          </p>
          <Link href={'/'}>
        <Button >
            Back to HomePage
        </Button>
        </Link>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <Image
            src={"/notfound.svg"}
             alt="Page not found"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};
 

export default  NotFoundPage