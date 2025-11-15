import { cn } from "@/lib/utils";
import { ArrowRightIcon, FolderIcon } from "lucide-react";
import React from "react";
import Folder from "./folder";

type Props = {
  workspaceId: string;
};

const Folders = ({ workspaceId }: Props) => {
  // Get folders
  // Optimistic Variable
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderIcon />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <p className="text-[#BDBDBD]">See All</p>
          <ArrowRightIcon className="text-[#707070]" />
        </div>
      </div>
      <section className={cn("flex items-center gap-4 overflow-x-auto w-full")}>
        <Folder name="Folder Title" count={10} />
      </section>
    </div>
  );
};

export default Folders;
