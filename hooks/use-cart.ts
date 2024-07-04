import {create} from "zustand"
import { ProductWithImages } from "@/lib/types"
import {persist,createJSONStorage} from "zustand/middleware"
import toast from "react-hot-toast"
export type CartItems= ProductWithImages&{quantity:number }
interface CartStore{
    items:CartItems[],
    addItem:(data:CartItems)=>void,
    removeItem:(id:string)=>void,
    removeAll:()=>void,
    incrementSize:(id:string)=>void
    decrementSize:(id:string)=>void

}


export const useCart=create(
    persist<CartStore>((set,get)=>({
        items:[],
        addItem:(data:CartItems)=>{
            const currentItems=get().items
            const existItem=currentItems.filter((item)=>item.id==data.id)
            if(existItem.length){
            return toast("item is already in cart")
            }
            
           
            set({items:[...get().items,data]})
            toast.success("item added to cart")
        },
        removeItem:(id:string)=>{
        set({items:[...get().items.filter((item)=>item.id!=id)]})
        toast.success("item removed")
    },
    
     incrementSize:(id:string)=>{
          const items=get().items.map(item=>{
             if(item.id==id){
                 item.quantity+=1
                  
             }
             return item
            }
            )
       set({items})

     }
    ,
     decrementSize:(id:string)=>{
          const items=get().items.map(item=>{
             if(item.id==id){
                 item.quantity-=1
                  
             }
             return item
            }
            )
       set({items})

     }
    ,
    removeAll:()=>{
        set({items:[]})
        toast.success("all items removed")
    }
    }),{
        name:"cart-storage",
        storage:createJSONStorage(()=>localStorage)
    }),
    
)
