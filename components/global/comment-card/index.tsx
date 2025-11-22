import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.type";
import { UserIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  comment: string;
  author: { image: string; firstName: string; lastName: string };
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};

const CommentCard = ({
  comment,
  author,
  videoId,
  commentId,
  reply,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState(false);

  return (
    // Continue from here 9:26:50
    <Card
      className={cn(
        isReply ? "bg-[#1D1D1D] pl-10 border-none" : "border bg-[#1D1D1D] p-5"
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Avatar>
          <AvatarImage src={author.image} alt="author image" />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <p className="capitalize text-sm text-[#BDBDBD]">
          {author.firstName} {author.lastName}
        </p>
      </div>
    </Card>
  );
};

export default CommentCard;
