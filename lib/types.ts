import { Prisma } from "@prisma/client";



export type CateogryWithSubCat=Prisma.CategoryGetPayload<{
    include:{
      subCategory:true
    }
}>
export type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

export type orderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            images: true;
          };
        };
      };
    };
  };
}>;

export type Item=Prisma.OrderItemGetPayload<{
   include:{
    product:{
      include:{
        images:true
      }
    }
   }
}>