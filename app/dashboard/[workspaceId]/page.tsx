import { WorkspacePage } from "@/components/global/workspace";

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
