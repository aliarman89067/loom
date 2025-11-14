import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  Icon?: LucideIcon;
  workspacePlaceHolder?: ReactNode;
  title: string;
  href: string;
  selected: boolean;
  notifications?: number;
};

export const SidebarItem = ({
  Icon,
  workspacePlaceHolder,
  title,
  href,
  selected,
  notifications,
}: Props) => {
  return (
    <li className="cursor-pointer my-[5px]">
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between group rounded-lg hover:bg-[#1d1d1d]",
          selected && "bg-[#1d1d1d]"
        )}
      >
        <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
          {workspacePlaceHolder && workspacePlaceHolder}
          {Icon && <Icon size={15} />}
          <span
            className={cn(
              "font-medium group-hover:text-[#9d9d9d] transition-all truncate w-32",
              selected ? "text-[#9d9d9d]" : "text-[#545454]"
            )}
          >
            {title}
          </span>
        </div>
      </Link>
    </li>
  );
};
