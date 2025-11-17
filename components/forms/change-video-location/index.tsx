import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/use-folders";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  videoId: string;
  workspaceId: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  workspaceId,
  currentFolder,
  currentFolderName,
}: Props) => {
  const query = useQueryClient();

  const revalidateFolderVideos = () => {
    query.invalidateQueries({
      queryKey: ["folder-videos"],
    });
  };

  const {
    errors,
    folders,
    isFetching,
    isFolders,
    isPending,
    onFormSubmit,
    register,
    workspaces,
  } = useMoveVideos(videoId, workspaceId, revalidateFolderVideos);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((w) => w.id === workspaceId);

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5">
      <div className="border rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
        {workspace && <p>{workspace.name}</p>}
        <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
        {folder ? <p>{folder.name} Folder</p> : <p>This video has no folder</p>}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex flex-col items-start gap-y-2 w-full">
          <p className="text-xs">Workspace</p>
          <select
            {...register("workspace_id")}
            className="rounded-lg outline-0 border border-neutral-500 text-base bg-transparent w-full py-2 px-1"
          >
            {workspaces.map((workspace) => (
              <option
                key={workspace.id}
                className="text-[#A4A4A4] bg-black"
                value={workspace.id}
              >
                {workspace.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetching ? (
          <Skeleton className="w-full h-10 rounded-xl" />
        ) : (
          <Label className="flex flex-col gap-y-2 items-start w-full">
            <p className="text-xs">Folders in this workspace</p>
            {isFolders && isFolders.length > 0 ? (
              <select
                {...register("folder_id")}
                className="rounded-lg outline-0 border border-neutral-500 text-base bg-transparent w-full py-2 px-1"
              >
                {isFolders.map((folder, key) =>
                  key === 0 ? (
                    <option
                      key={folder.id}
                      value={folder.id}
                      className="text-[#A4A4A4] bg-black"
                    >
                      {folder.name}
                    </option>
                  ) : (
                    <option
                      key={folder.id}
                      value={folder.id}
                      className="text-[#A4A4A4] bg-black"
                    >
                      {folder.name}
                    </option>
                  )
                )}
              </select>
            ) : (
              <p className="text-[#A4A4A4] text-sm">
                This workspace has no folders
              </p>
            )}
          </Label>
        )}
      </div>
      <Button>
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
