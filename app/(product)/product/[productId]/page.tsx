import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import AddToCartButton from "./AddToCartBtn";
 
import { Loader } from "@/components/ui/loader";
import { priceFormater } from "@/lib/format";
import { ArrowRight } from "lucide-react";
import { ImageTab } from "../_component/ImageTab";
import { SemilarProductCard } from "../_component/SemilarProductCard";


interface ProductPageProps {
  params: {
    productId: string;
  };
}


const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
     subCategory:true
    },
  });
  if (!product) notFound();
  return product;
});
 
 
 

export async function generateMetadata({
  params: { productId },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(productId);

  return {
    metadataBase: new URL("https://store-git-master-riteshyadavanshi.vercel.app/"),
    title: product.name + "-Shoplic Diaries",
    description: "shop",
    openGraph: {
      images: [{ url: product.images[0].imageUrl }],
    },
  };
}

export default async function ProductPage(
   {params:{ productId }}:ProductPageProps
 ) {
  const product = await getProduct(productId);

   

  return (
    <>
      <main className="mx-auto max-w-5xl  sm:px-6 sm:pt-16 lg:px-8 p-2 ">
        <div className="mx-auto max-w-2xl lg:max-w-none lg:flex gap-x-10 p-3 lg:p-0">
          <div className="flex-1 rounded-sm ">
            <ImageTab images={product.images} />
          </div>
          <div className="flex-1  flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <span className="text-xl">
              {" "}
              {priceFormater.format(product.price)}
            </span>
            <p>
              {product.description}
            </p>
            
            <AddToCartButton
              product={product}
               
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-y-2">
          <h1 className="text-xl font-semibold lg:text-3xl flex items-center">
            Similiar Products
            <ArrowRight />
          </h1>
          <Suspense fallback={<Loader/>}>
           <SemilarProductCard  productId={productId} categoryId={product.subCategory.id}/>
          </Suspense>
        </div>
      </main>
    </>
  );
}
