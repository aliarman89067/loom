import { ReactNode } from "react";
import {
  BellIcon,
  BookOpenTextIcon,
  CircleDollarSignIcon,
  HomeIcon,
  LucideIcon,
  SettingsIcon,
} from "lucide-react";

export const MENU_ITEMS = (
  workspaceId: string
): { title: string; href: string; Icon: LucideIcon }[] => [
  { title: "Home", href: `/dashboard/${workspaceId}/home`, Icon: HomeIcon },
  {
    title: "My Library",
    href: `/dashboard/${workspaceId}`,
    Icon: BookOpenTextIcon,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    Icon: BellIcon,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    Icon: CircleDollarSignIcon,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    Icon: SettingsIcon,
  },
];
