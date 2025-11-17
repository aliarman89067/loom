import { createFolder } from "@/actions/workspace";
import { useMutationData } from "./use-mutation-data";

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData({
    mutationKey: ["create-folder"],
    mutationFn: () => createFolder(workspaceId),
    queryKey: "workspace-folders",
  });

  const onCreateNewFolder = () =>
    mutate({ name: "Untitled", id: "optimistic-id" });

  return { onCreateNewFolder };
};
