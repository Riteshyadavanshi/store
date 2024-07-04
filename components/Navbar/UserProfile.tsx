"use client";

import { LogOut, UserCog } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { User } from "@supabase/supabase-js";
import { logOut } from "@/action/auth/auth";

interface UserProfileProps {
  user: User | null;
}
export const UserProfile = ({ user }: UserProfileProps) => {
  const router = useRouter();
  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Successfully logout"))
      .catch((err) => toast.error("something went wrong"));
  };

  const handleRedirect = (url: string) => router.push(`/${url}`);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="z-[99999]">
          <UserCog />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user && (
            <DropdownMenuItem onClick={() => handleRedirect("order")}>
              my order
            </DropdownMenuItem>
          )}
          {user ? (
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut /> Log out
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleRedirect("login")}>
              {" "}
              log in{" "}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
