import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ui/productCard";
import { Filter } from "../../_component/filter";
import Image from "next/image";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

interface CategoryProductProps {
  params: { subCategoryId: string };
  searchParams: {
    price: "asc" | "desc";

    gender: string;
  };
}
const CategoryProduct = async ({
  params,
  searchParams,
}: CategoryProductProps) => {
  const { subCategoryId } = params;
  
  return (
    <>
      <div className="min-h-screen ">
        <div className="p-2">
          <Filter/>
        </div>
        <Suspense fallback={<FallbackLoader />}>
          <Data subCategoryId={subCategoryId} searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

const Data = async ({
  subCategoryId,
  searchParams,
}: {
  subCategoryId: string;
  searchParams: { price: "asc" | "desc" };
}) => {
  const { price  } = searchParams;
  const products = await prisma.product.findMany({
    where: {
      subCategoryId,
    },
    include: {
      images: true,
    },
    orderBy: {
      price: price || "asc",
    },
  });
  if (!products.length) {
    return (
      <div className="flex w-screen flex-col justify-center items-center">
        <Image
          width={500}
          height={500}
          src={"/notfound2.png"}
          alt="not found image"
        />
        <p className="text-xl">oops product not found </p>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen">
        <div className=" grid grid-cols-2 lg:grid-cols-4 gap-2   p-2  ">
          {products.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;

const FallbackLoader = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    </>
  );
};
