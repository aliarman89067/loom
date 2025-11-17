"use client";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, FolderIcon } from "lucide-react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/use-query-data";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
  workspaceId: string;
};

export type FoldersProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId: string | null;
  })[];
};

const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch();
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVariables } = useMutationDataState(["create-folder"]);
  const { data: folders, status } = data as FoldersProps;

  if (isFetched && folders) {
    dispatch(FOLDERS({ folders }));
  }

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
      <section
        className={cn(
          "flex items-center gap-4 overflow-x-auto w-full",
          status !== 200 && "justify-center"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace!</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
            )}
            {folders.map((folder) => (
              <Folder
                key={folder.id}
                count={folder._count.videos}
                id={folder.id}
                name={folder.name}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
