"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/use-query-data";
import { getWorkSpaces } from "@/actions/workspace";
import { NotificationsProps, WorkspaceProps } from "@/types/index.type";
import Modal from "../modal";
import { MenuIcon, PlusCircleIcon } from "lucide-react";
import WorkspaceSearch from "../search";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import { SidebarItem } from "./sidebar-item";
import { getNotifications } from "@/actions/user";
import WorkspacePlaceHolder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);

  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );

  const { data: workspace } = data as WorkspaceProps;
  const { data: count } = notifications as NotificationsProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const currentWorkspace = workspace.workspace.find(
    (ws) => ws.id === activeWorkspaceId
  );

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col items-center gap-4 overflow-x-hidden overflow-y-scroll">
      <div className="bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/opal-logo.svg" alt="Logo" width={40} height={40} />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent w-full">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl w-full">
          <SelectGroup>
            <SelectLabel>Personal Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Public Workspaces</SelectLabel>
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.workspace && (
                    <SelectItem
                      key={workspace.workspace.id}
                      value={workspace.workspace.id}
                    >
                      {workspace.workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan === "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircleIcon
                  className="text-neutral-800/90 fill-neutral-500"
                  size={15}
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite to workspace
                </span>
              </span>
            }
            title="Invite to workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              Icon={item.Icon}
              href={item.href}
              title={item.title}
              selected={pathname === item.href}
              notifications={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Workspaces</p>
      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full -mt-2">
          <p className="text-[#9d9d9d] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces"
              : "No Workspaces"}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="max-h-[150px] min-h-[40px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    key={item.id}
                    href={`/dashboard/${item.id}`}
                    selected={pathname === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    workspacePlaceHolder={
                      <WorkspacePlaceHolder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceHolder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItem
                key={item.workspace.id}
                href={`/dashboard/${item.workspace.id}`}
                selected={pathname === `/dashboard/${item.workspace.id}`}
                title={item.workspace.name}
                notifications={0}
                workspacePlaceHolder={
                  <WorkspacePlaceHolder>
                    {item.workspace.name.charAt(0)}
                  </WorkspacePlaceHolder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcription, AI summary, and more."
          footer={
            <Button className="text-sm w-full">
              <Loader color="#000000" state={false}>
                Upgrade
              </Loader>
            </Button>
          }
        ></GlobalCard>
      )}
    </div>
  );
  return (
    <div>
      {/* Info bar */}
      <InfoBar />
      {/* Sidebar for mobile and desktop */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant="ghost" className="mt-[2px]">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
