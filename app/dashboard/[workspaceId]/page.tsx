import React from "react";
import { WorkspacePage } from "@/components/global/workspace";
import { Tabs } from "@/components/ui/tabs";

type Props = {
  params: Promise<{
    workspaceId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { workspaceId } = await params;
  return <WorkspacePage workspaceId={workspaceId} />;
};

export default page;
