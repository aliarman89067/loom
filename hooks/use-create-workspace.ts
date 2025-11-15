import { createWorkSpace } from "@/actions/workspace";
import { useMutationData } from "./use-mutation-data";
import useZodForm from "./use-zod-form";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData({
    mutationKey: ["create-workspace"],
    mutationFn: (data: { name: string }) => createWorkSpace(data.name),
    queryKey: "user-workspaces",
  });

  const { errors, onFormSubmit, register } = useZodForm({
    schema: workspaceSchema,
    mutation: mutate,
  });
  return { errors, onFormSubmit, register, isPending };
};
