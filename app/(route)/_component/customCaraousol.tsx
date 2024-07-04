 "use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

 
import {
  Carousel,
  CarouselContent,
 
} from "@/components/ui/carousel"

interface CustomeCarousel{
    
     children:React.ReactNode
}
export  const CustomeCarousel=({children}:CustomeCarousel)=> {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
 
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-[500px]  "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {children}
      </CarouselContent>
     
    </Carousel>
  )
}
