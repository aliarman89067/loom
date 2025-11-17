import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./use-mutation-data";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import useZodForm from "./use-zod-form";
import { moveVideoSchema } from "@/components/forms/change-video-location/schema";

export const useMoveVideos = (
  videoId: string,
  workspaceId: string,
  onSuccess?: () => void
) => {
  // get state redux
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorkspaceReducer);

  // fetching states
  const [isFetching, setIsFetching] = useState(false);
  // State for folders
  const [isFolders, setIsFolders] = useState<
    | ({ _count: { videos: number } } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);

  // use Mutation data optimistic change
  const { mutate, isPending } = useMutationData({
    mutationKey: ["change-video-location"],
    mutationFn: (data: { folder_id: string; workspaceId: string }) => {
      return moveVideoLocation(videoId, data.workspaceId, data.folder_id);
    },
    onSuccess,
  });
  // useZodForm
  const { onFormSubmit, errors, watch, register } = useZodForm({
    schema: moveVideoSchema,
    mutation: mutate,
    defaultValues: {
      folder_id: null,
      workspaceId: workspaceId,
    },
  });
  // Fetch folders
  // fetch folders with a useEffect
  //
  const fetchFolders = async (workspace: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolders(workspace);
    setIsFetching(false);
    setIsFolders(folders.data);
  };

  useEffect(() => {
    fetchFolders(workspaceId);
  }, []);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspaceId) fetchFolders(value.workspaceId);
    });

    return () => workspace.unsubscribe();
  }, [watch]);

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolders,
  };
};
