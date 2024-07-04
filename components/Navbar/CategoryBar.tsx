import { LayoutDashboard } from "lucide-react";
import { SideBarWrapper } from "../SideBarWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Category } from "@prisma/client";
import { CateogryWithSubCat } from "@/lib/types";
import Link from "next/link";
import { Heading } from "../ui/heading";

interface CateogryMenuProps {
  cateogaries: CateogryWithSubCat[];
}
export const CateogryMenu = ({ cateogaries }: CateogryMenuProps) => {
  return (
    <SideBarWrapper
      label="All"
      icon={<LayoutDashboard className="h-4 w-4" />}
      className="space-x-2"
    >
      <div className="flex justify-center ">
        <Accordion type="single" collapsible className="w-full">
          <Heading title="Categories" />
          {cateogaries.map((cateogry) => (
            <>
              <AccordionItem value={cateogry.name} key={cateogry.name}>
                <AccordionTrigger>{cateogry.name}</AccordionTrigger>

                <AccordionContent>
                  {cateogry.subCategory.map(({ name, id }) => (
                    <Link href={`/category/${id}`} key={name}>
                      {name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </>
          ))}
        </Accordion>
      </div>
    </SideBarWrapper>
  );
};
