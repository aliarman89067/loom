"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { UserButton } from "@clerk/nextjs";
import {
  ClapperboardIcon,
  Loader2Icon,
  LoaderIcon,
  SearchIcon,
  UploadIcon,
} from "lucide-react";
import React from "react";

type Props = {};

const InfoBar = (props: Props) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    "get-info",
    "INFO"
  );
  console.log(onUsers);
  return (
    <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
      <div className="flex gap-4 items-center justify-center border-2 rounded-full px-4 w-full max-w-lg">
        {isFetching ? (
          <Loader2Icon size={18} className="animate-spin text-neutral-500" />
        ) : (
          <SearchIcon size={25} className="text-[#707070]" />
        )}
        <Input
          value={query}
          onChange={onSearchQuery}
          className="bg-transparent! outline-0! ring-0! focus-visible::ring-0! focus-visible::border-none! border-none placeholder-neutral-500!"
          placeholder="Search for peoples, project, tags & folders..."
        />
      </div>
      <div className="flex items-center gap-4">
        <Button className="bg-[#9d9d9d] flex items-center gap-2">
          <UploadIcon size={20} />{" "}
          <span className="flex items-center gap-2">Upload</span>
        </Button>
        <Button className="bg-[#9d9d9d] flex items-center gap-2">
          <ClapperboardIcon size={20} />{" "}
          <span className="flex items-center gap-2">Record</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
