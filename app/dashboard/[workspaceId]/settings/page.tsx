"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { enabledFirstView, getFirstView } from "@/actions/user";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => {
  const [firstView, setFirstView] = useState<boolean | undefined>(undefined);
  const { setTheme, themes } = useTheme();

  useEffect(() => {
    if (firstView !== undefined) return;
    const fetchData = async () => {
      const response = await getFirstView();
      if (response.status === 200) setFirstView(response?.data);
    };
    fetchData();
  }, [firstView]);

  const switchState = async (checked: boolean) => {
    const view = await enabledFirstView(checked);
    if (view) {
      toast(view.status === 200 ? "Success" : "Failed", {
        description: view.data,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Video Sharing Settings</h2>
      <p className="text-muted-foreground">
        Enabling this feature will send you notifications when someone watched
        our video for the first time. This feature can help during client
        outreach.
      </p>
      <Label className="flex items-center gap-x-3 mt-4 text-md">
        Enable First View
        <Switch
          onCheckedChange={switchState}
          disabled={firstView === undefined}
          checked={firstView}
          onClick={() => setFirstView(!firstView)}
        />
      </Label>
    </div>
  );
};

export default SettingsPage;
