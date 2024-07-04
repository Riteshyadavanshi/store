"use cleint";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
 
} from "@/components/ui/card";
import { Header } from "./Header";
import Link from "next/link";

interface CardWraperProps {
  children: React.ReactNode;
}
const CardWrapper = ({ children }: CardWraperProps) => {
  return (
    <>
      <Card className="lg:min-w-[500px] max-w-[380px] m-1 shadow-md">
        <CardHeader>
          <Header />
        </CardHeader>

        <CardContent>
          <div className="space-y-2 p-1">
            <h1 className="text-xl font-bold">Sign in </h1>
            <h1 className="text-muted-foreground ">to continue to Shopholic</h1>
          </div>
          {children}
          
          </CardContent>
         
      </Card>
    </>
  );
};

export default CardWrapper;
