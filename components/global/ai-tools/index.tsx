import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import Loader from "../loader";
import {
  BotIcon,
  DownloadIcon,
  FileTextIcon,
  PencilIcon,
  StarsIcon,
  TextIcon,
  VideoIcon,
} from "lucide-react";

type Props = {
  plan: "FREE" | "PRO";
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan, trial, videoId }: Props) => {
  // WIP: Setup AI hook
  return (
    <TabsContent
      value="Ai tools"
      className="p-2 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10"
    >
      <div className="flex items-center">
        <div className="flex flex-col gap-4">
          <div className="w-8/12">
            <h3 className="text-3xl font-bold">Ai Tools</h3>
            <p>
              Task your video to the next <br /> step with the power of AI!{" "}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button className="mt-2 text-sm">
              <Loader state={false} color="#000">
                Try now
              </Loader>
            </Button>
            <div className="flex items-center justify-center gap-4">
              {/* WIP: Pay button */}
              <Button className="mt-2 text-sm" variant="secondary">
                <Loader state={false} color="#000">
                  Pay now
                </Loader>
              </Button>
              <Button className="mt-2 text-sm">
                <Loader state={false} color="#000">
                  Generate Now
                </Loader>
              </Button>
            </div>
          </div>
          <div className="w-full border rounded-xl p-4 flex flex-col gap-y-2 bg-[#1b0f1b7f]">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#a22fe0]">Opal Ai</h2>
              <StarsIcon className="text-[#a22fe0] fill-[#a22fe0]" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center justify-center shrink-0 w-13 h-13 rounded-full border-[#2D2D2D] border bg-[#2B2B2B]">
                <PencilIcon className="size-7 text-[#a22fe0]" />
              </div>
              <div className="flex flex-col">
                <h3 className="textmdg">Summary</h3>
                <p className="text-muted-foreground text-sm">
                  Generate a description for your video using AI.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center justify-center shrink-0 w-13 h-13 rounded-full border-[#2D2D2D] border bg-[#2B2B2B]">
                <FileTextIcon className="size-7 text-[#a22fe0]" />
              </div>
              <div className="flex flex-col">
                <h3 className="textmdg">Summary</h3>
                <p className="text-muted-foreground text-sm">
                  Generate a description for your video using AI.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center justify-center shrink-0 w-13 h-13 rounded-full border-[#2D2D2D] border bg-[#2B2B2B]">
                <BotIcon className="size-7 text-[#a22fe0]" />
              </div>
              <div className="flex flex-col">
                <h3 className="textmdg">Summary</h3>
                <p className="text-muted-foreground text-sm">
                  Generate a description for your video using AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
