"use client";
import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/use-video";
import { SendIcon, XIcon } from "lucide-react";
import React from "react";

type Props = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
};

const CommentForm = ({ videoId, commentId, author, close }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useVideoComment({
    videoId,
    commentId,
  });

  return (
    <form className="relative w-full" onSubmit={onFormSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        inputType="input"
        name="comment"
        placeHolder={`Respond to ${author}`}
        lines={8}
        type="text"
      />
      <Button
        className="p-0 bg-transparent absolute top-1 right-3 hover:bg-transparent"
        type="submit"
      >
        <Loader state={isPending}>
          <SendIcon
            size={18}
            className="text-white/50 cursor-pointer hover:text-white/80"
          />
        </Loader>
      </Button>
    </form>
  );
};

export default CommentForm;
