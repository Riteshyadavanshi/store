import { ProductWithImages } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";
import {prisma} from '@/lib/db'
 

interface SemilarProductCardProps {
   productId:string,
   categoryId:string
}
export const SemilarProductCard = async({ productId,categoryId }: SemilarProductCardProps) => {
  const semiliarProducts = await prisma.product.findMany({
    where: {
      subCategoryId:categoryId,
      NOT: {
        id: productId,
      },
    },
    include: {
      images: true,
    },
    take: 10,
  });
  if (!semiliarProducts?.length) {
    return <p>semiliar product is not available</p>;
  }
   
  return (
    <>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {semiliarProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.name}>
            <div className="max-w-[150px]  border-[1px] rounded-sm border-muted-foreground">
              <Image
                width={100}
                height={100}
                src={product.images[0].imageUrl}
                className="object-cover h-auto aspect-square relative"
                alt="sfs"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
