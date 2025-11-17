"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import { FolderIcon } from "lucide-react";
import {
  useMutationData,
  useMutationDataState,
} from "@/hooks/use-mutation-data";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
  name: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ id, name, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const folderCardRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const rename = () => setOnRename(true);
  const renamed = () => setOnRename(false);

  // WIP: add loading states

  //   Optimistic
  const { mutate, isPending } = useMutationData({
    mutationKey: ["rename-folders"],
    mutationFn: (data: { name: string }) => renameFolders(id, data.name),
    queryKey: "workspace-folders",
    onSuccess: renamed,
  });

  const { latestVariables } = useMutationDataState(["rename-folders"]);
  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    rename();
  };

  const updateFolderName = (
    e: React.FocusEvent<HTMLInputElement | Element>
  ) => {
    if (inputRef.current && inputRef.current.value) {
      mutate({ name: inputRef.current.value, id });
    } else renamed();
  };

  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 transition-all cursor-pointer duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border"
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-1">
          {onRename ? (
            <Input
              ref={inputRef}
              onBlur={updateFolderName}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              placeholder={name}
              className="border-none px-2 text-base w-full outline-0 text-neutral-300 bg-transparent py-0"
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300"
              onDoubleClick={handleNameDoubleClick}
            >
              {latestVariables &&
              latestVariables.status === "pending" &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} Videos</span>
        </div>
      </Loader>
      <FolderIcon />
    </div>
  );
};

export default Folder;
