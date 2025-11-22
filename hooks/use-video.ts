import { useMutationData } from "./use-mutation-data";
import { useQueryData } from "./use-query-data";
import useZodForm from "./use-zod-form";
import { createCommentAndReply, getUserProfile } from "@/actions/user";
import { createCommentSchema } from "@/components/forms/comment-form/schema";

export const useVideoComment = ({
  videoId,
  commentId,
}: {
  videoId: string;
  commentId?: string;
}) => {
  const { data } = useQueryData(["user-profile"], () => getUserProfile());

  const { status, data: user } = data as {
    status: number;
    data: {
      id: string;
      image: string;
    };
  };

  const { isPending, mutate } = useMutationData({
    mutationKey: ["new-comment"],
    mutationFn: (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
    queryKey: "video-comments",
    onSuccess: () => reset(),
  });

  const { reset, register, errors, onFormSubmit } = useZodForm({
    schema: createCommentSchema,
    mutation: mutate,
  });

  return { register, errors, isPending, onFormSubmit };
};
