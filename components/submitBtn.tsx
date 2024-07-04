"use client"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export const SubmitBtn = () => {
    const {pending}=useFormStatus()
  return (
    <Button variant={"destructive"} size={"sm"}  disabled={pending}>
    {
         pending &&<Loader2 className='w-4 h-4 animate-spin'/>
    } continue
      </Button>
  )
}
