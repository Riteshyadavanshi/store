import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    

<footer className="bg-white rounded-lg shadow m-4  dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="https://shopholicdiaries.com/" className="hover:underline">Shopholic</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <Link href="/terms-condition" className=" underline   me-4 md:me-6 ">
              terms and condition
            </Link>
        </li>
        <li>
            <Link href="/cancelation-refund" className=" underline me-4 md:me-6">Cancelation Refund</Link>
        </li>
        <li>
            <Link href="/shipping-delivery" className=" underline me-4 md:me-6">Shipping Delivery</Link>
        </li>
         
    </ul>
    </div>
</footer>

  )
}
