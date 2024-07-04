"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
interface ActionBtnProps {
  onClick: () => void;
  className?: string;
  icon: React.ReactElement;
  variant?:"default"|"outline"|"destructive"|"ghost"
  disabled?:boolean
}
export const ActionButton = ({ onClick,
      className, icon ,variant="destructive",
       disabled=false
  }: ActionBtnProps) => {
  return (
    <Button
      variant={variant}
      size={"icon"}
      onClick={onClick}
      disabled={disabled}
      className={cn("", className)}
    >
      {icon}
    </Button>
  );
};
