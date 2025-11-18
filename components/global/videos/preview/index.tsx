"use client";
import { getPreviewVideo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/use-query-data";
import { VideoProps } from "@/types/index.type";
import { useRouter } from "next/navigation";
import CopyLink from "../copy-link";
import RichLink from "../rich-link";
import { truncateString } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import TabsMenu from "../../tabs";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  // WIP: Setup notify first view
  const router = useRouter();
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  const { data: video, status, author } = data as VideoProps;
  if (status !== 200) {
    router.push("/");
    return;
  }
  const daysAgo = Math.floor(
    (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10">
        <div>
          <div className="flex gap-x-5 items-start justify-between">
            <h2 className="text-white text-4xl font-bold">{video.title}</h2>
            {/* {author ? (
              <EditVideo 
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            ): <></>} */}
          </div>
          <span className="flex gap-x-2 mt-2">
            <p className="text-[#9D9D9D] capitalize">
              {video.user?.firstName} {video.user?.lastName}
            </p>
            <p className="text-[#707070]">
              {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
            </p>
          </span>
        </div>
        <video
          preload="metadata"
          controls
          className="w-full aspect-video opacity-50 rounded-xl"
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`}
          />
        </video>
        <div className="flex flex-col text-2xl gap-y-4">
          <div className="flex gap-x-5 items-center justify-between">
            <p className="text-[#BDBDBD] font-semibold">Description</p>
            {/* {author ? (
              <EditVideo 
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            ): <></>}  */}
          </div>
          <p className="text-[#9D9D9D] text-lg font-medium">
            {video.description || "No description"}
          </p>
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end items-center gap-x-3">
          <CopyLink
            videoId={videoId}
            variant="outline"
            className="rounded-full bg-transparent px-10"
          />
          <RichLink
            description={truncateString(
              (video.description || "No description") as string,
              150
            )}
            id={videoId}
            source={video.source}
            title={video.title as string}
          />
          <DownloadIcon className="text-[#4D4C4C]" />
        </div>
        <div>
          {/* TODO: Continue from here */}
          <TabsMenu
            trigger={["all", "summary", "activity"]}
            defaultValue="all"
          ></TabsMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
