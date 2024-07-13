 
import Script from 'next/script'
import React from 'react'
interface CartLayoutProps{
    children:React.ReactNode
}
 
 
const CartLayout = ({children}:CartLayoutProps) => {
  return (
    <>
     
    <div className='min-h-screen'> {children}</div>
 </> )
}

export default CartLayout