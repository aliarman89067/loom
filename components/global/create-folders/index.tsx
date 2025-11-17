"use client";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/use-create-folders";
import { FolderIcon } from "lucide-react";

type Props = {
  workspaceId: string;
};

const CreateFolders = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);
  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#1D1D1D] text-[#7D7D7D] flex items-center gap-2 py-6 px-4 rounded-2xl"
    >
      <FolderIcon />
      Create a folder
    </Button>
  );
};

export default CreateFolders;
