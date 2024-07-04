 
import Script from 'next/script'
import React from 'react'
interface CartLayoutProps{
    children:React.ReactNode
}
 
 
const CartLayout = ({children}:CartLayoutProps) => {
  return (
    <>
     
    <div  > {children}</div>
 </> )
}

export default CartLayout