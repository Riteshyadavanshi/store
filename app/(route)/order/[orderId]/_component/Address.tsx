import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
interface Address{
     address:string,
     pinCode:string
}
const Address = ({address,pinCode}:Address) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
            <h1>{address}</h1>
             <h1>pin code:{pinCode}</h1>
        </CardContent>
    </Card>
  )
}

export default Address