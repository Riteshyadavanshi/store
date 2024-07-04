import type { Metadata } from "next";
import { Exo_2} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Banner } from "@/components/Navbar/banner";
 
 const font =Exo_2({
  subsets:["latin"],
  weight:[ "100","200","300","400","500","600","700","800","900"]
 })

export const metadata: Metadata = {
  metadataBase:new URL("https://store-git-master-riteshyadavanshi.vercel.app/"),
  title: "Shopholic Diaries",
  description: "one stop shop ecommerce shopping ",
  keywords:["shopholic Diaries ","online shoping","one stop shop","ecommerce"],
  openGraph:{
    images:[{url:"https://store-git-master-riteshyadavanshi.vercel.app/logo.jpg"}]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className)} suppressHydrationWarning={true}>
      <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
       >
        <Toaster position="top-center"/>
         
         
        <Navbar/>
        <div className="min-h-screen w-screen mt-[150px] lg:mt-[100px] ">
          <Banner/>
        {children}
        <Footer/>
        </div>
        </ThemeProvider>
        
        </body>
    </html>
  );
}
