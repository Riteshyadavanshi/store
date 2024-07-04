import { ProductCard } from "@/components/ui/productCard";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { Filter } from "./_component/filter";
import { Heading } from "@/components/ui/heading";
import { CustomeCarousel } from "./_component/customCaraousol";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
interface HomeProps {
  searchParams: {
    category: string;
    price: "desc" | "asc";
  };
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const price = searchParams.price;
  
  const products = await prisma.product.findMany({
    orderBy: {
      price: price || "asc",
    },
    include: {
      images: true,
    },
  });
  const offers = ["/offer.jpg", "/offer2.jpeg", "/offer3.jpeg", "/offer4.png"];

  return (
    <div className="flex   w-screen p-2 flex-col">
      <div className="flex justify-between mx-auto  items-center  ">
        
        <div className="  p-1 md:p-2  ">
          <CustomeCarousel>
            {offers.map((url, index) => (
              <CarouselItem key={index}>
                <div className="p-1  ">
                  <Card className="w-full">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image src={url} width={500} height={500} alt="photo" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CustomeCarousel>
        </div>
        
      </div>
      <div className="w-full relative space-y-4 ">
        <div className="flex justify-center">
          <Heading title="Products" />
        </div>
        <div>
          <Filter   />
        </div>
        <div className=" grid grid-cols-2 lg:grid-cols-4    gap-2 w-full ">
          {products.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
