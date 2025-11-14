import { ReactNode } from "react";
import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getNotifications, onAuthenticatedUser } from "@/actions/user";
import Sidebar from "@/components/global/sidebar";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkSpace,
} from "@/actions/workspace";

type Props = {
  params: Promise<{
    workspaceId: string;
  }>;
  children: ReactNode;
};

const Layout = async ({ params, children }: Props) => {
  const { workspaceId } = await params;
  const auth = await onAuthenticatedUser();
  if (!auth.user?.workspace || !auth.user.workspace.length) {
    return redirect("/auth/sign-in");
  }
  const hasAccess = await verifyAccessToWorkSpace(workspaceId);
  if (!hasAccess.data?.workspace) return null;
  if (hasAccess.status !== 200) {
    return redirect(`/dashboard/${auth.user.workspace[0].id}`);
  }

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
