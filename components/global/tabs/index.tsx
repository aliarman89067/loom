import { Tabs, TabsList } from "@/components/ui/tabs";
import React, { ReactNode } from "react";

type Props = {
  trigger: string[];
  children: ReactNode;
  defaultValue: string;
};

const TabsMenu = ({ children, trigger, defaultValue }: Props) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="flex justify-start bg-transparent"></TabsList>
    </Tabs>
  );
};

export default TabsMenu;
