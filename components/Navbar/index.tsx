import { prisma } from "@/lib/db";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Search from "./Search";

import Link from "next/link";
import { ModeToggle } from "../DarkModeBtn";
import { CartBag } from "./CartBag";
import { CateogryMenu } from "./CategoryBar";
import { UserProfile } from "./UserProfile";
 
import { getUser } from "@/action/auth/auth";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
const Navbar = async () => {
  
  
  const {
    data: { user },
  } = await getUser()
  
  const cateogries = await prisma.category.findMany({
    include: {
      subCategory: true,
    },
  });
  return (
    <>
      <nav
        className={cn(
          "   justify-between shadow-md fixed top-0 z-[11] bg-white w-full px-4   dark:bg-black items-center pb-2 lg:pb-0",
          font.className
        )}
      >
        <div className="flex justify-between items-center">
          <div className="lg:flex-1  ">
            <Link href={"/"}>
              <Image
                src={"/logo2.png"}
                priority
                width={900}
                height={900}
                alt="logo image"
                className="  rounded-full  w-24 h-24 dark:bg-transparent"
              />
            </Link>
          </div>
          <div className="  flex-1  ">
            <CateogryMenu cateogaries={cateogries} />
          </div>
          <div className="lg:flex-1 lg:flex items-center hidden  ">
            <Search />
          </div>

          <div className="relative flex flex-row-reverse gap-x-2 lg:flex-1 items-center">
            <ModeToggle />
            <div className="relative">
              <CartBag />
            </div>
            <UserProfile user={user} />
          </div>
        </div>
        <div className="flex justify-center lg:hidden ">
          <Search />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
