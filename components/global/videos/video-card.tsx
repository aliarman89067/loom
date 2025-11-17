import React from "react";
import Loader from "../loader";
import CardMenu from "./video-card-menu";
import ChangeVideoLocation from "@/components/forms/change-video-location";
import CopyLink from "./copy-link";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DotIcon, Share2Icon, UserIcon } from "lucide-react";

type Props = {
  user: {
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  } | null;
  id: string;
  folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId: string;
};

const VideoCard = (props: Props) => {
  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border border-[#252525] rounded-xl"
      state={props.processing}
    >
      <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 hidden group-hover:flex items-center gap-x-3">
          <CardMenu
            videoId={props.id}
            workspaceId={props.workspaceId}
            currentFolder={props.folder?.id}
            currentFolderName={props.folder?.name}
          />
          <CopyLink
            className="p-0 h-6 w-6 hover:bg-transparent! bg-transparent"
            videoId={props.id}
            variant="ghost"
          />
        </div>
        <Link
          href={`/preview/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-y-2 z-20">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center">
              <Avatar className="mt-4 w-8 h-8">
                <AvatarImage src={props.user?.image as string} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div className="-mb-4">
                <p className="capitalize text-xs text-[#BDBDBD]">
                  {props.user?.firstName} {props.user?.lastName}
                </p>
                <p className="text-[#707070] text-xs flex items-center">
                  <DotIcon />
                  {daysAgo === 0 ? "Today" : `${daysAgo} ago`}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share2Icon
                  fill="#9D9D9D"
                  className="text-[#9D9D9D]"
                  size={12}
                />
                <p className="text-xs text-[#9D9D9D] capitalize">
                  {props.user?.firstName}&apos;s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
