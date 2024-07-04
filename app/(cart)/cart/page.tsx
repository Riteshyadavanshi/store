import React from 'react'
import {CartPage} from './_component/cart-page'
 
 
import { getUser } from '@/action/auth/auth'
 
 

 const  Cart = async() => {
   const {
      data: { user },
    } = await getUser()

 
  return (
     <>
      <CartPage user={user}/>
        
     
     </>
  )
}

export default Cart