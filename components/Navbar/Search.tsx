"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";

import { useRouter } from "next/navigation";

const Search = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    router.push(`/${value}`);
    setValue("")
  };
  return (
    <div className="flex-1 lg:ml-10">
      <form onSubmit={onSubmit} className="flex  ">
        <Input
          placeholder="search"
          type="text"
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          className="w-full rounded-r-none   focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <Button
          variant={"ghost"}
          type="submit"
          className="rounded-l-none bg-transparent"
        >
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default Search;
