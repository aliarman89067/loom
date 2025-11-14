import {
  MutationFunction,
  MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  mutationKey: MutationKey;
  mutationFn: MutationFunction<any, any>;
  queryKey?: string;
  onSuccess?: () => void;
};

export const useMutationData = ({
  mutationKey,
  mutationFn,
  queryKey,
  onSuccess,
}: Props) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
      return toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.data,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: [queryKey],
      });
    },
  });
  return { mutate, isPending };
};
