import CommentForm from "@/components/forms/comment-form";
import { TabsContent } from "@/components/ui/tabs";
import CommentCard from "../comment-card";
import { useQueryData } from "@/hooks/use-query-data";
import { getVideoComments } from "@/actions/user";
import { VideoCommentProps } from "@/types/index.type";

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  const { data } = useQueryData(["video-comments"], () =>
    getVideoComments(videoId)
  );

  const { data: comments } = data as VideoCommentProps;

  return (
    <TabsContent
      value="Activity"
      className="p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-5"
    >
      <CommentForm author={author} videoId={videoId} />
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment.comment}
          author={{
            image: comment.user?.image!,
            firstName: comment.user?.firstName!,
            lastName: comment.user?.lastName!,
          }}
          videoId={videoId}
          reply={comment.reply}
          commentId={comment.id}
        />
      ))}
    </TabsContent>
  );
};

export default Activities;
