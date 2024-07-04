import AddToCartButton from "@/app/(product)/product/[productId]/AddToCartBtn";

import { priceFormater } from "@/lib/format";
import { ProductWithImages } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ProductCardProps {
  product: ProductWithImages;
}
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex  shadow-md dark:bg-[#15202B] rounded-sm    relative     p-1  flex-wrap">
      <Link
        className="w-full p-1 md:p-2  h-[200px]"
        href={`/product/${product.id}`}
      >
        <Image
          alt="gallery"
          width={300}
          height={300}
          className="block  h-full w-full cursor-pointer   rounded-lg object-cover aspect-square"
          src={product.images[0].imageUrl}
        />
      </Link>
      <div className="w-full">
        <div className="p-1">
          <h1 className="font-bold tracking-tighter text-indigo-900 dark:text-white ">{product.name}</h1>
          <p className="text-muted-foreground tracking-tighter">
            {priceFormater.format(product.price)}    <span className=" text-sm ml-4"> other site :<span className="line-through">{priceFormater.format(product.otherPrice)}</span></span>
          </p>
        </div>
        <div className=" p-2  ">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
