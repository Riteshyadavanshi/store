import React from 'react'
 

export const Heading = ({title}:{title:string}) => {
  return (
    <h1 className="text-3xl font-bold    text-indigo-900 dark:text-white">{title}</h1>
  )
}
