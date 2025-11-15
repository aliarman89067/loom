"use client";
import React from "react";
import { getWorkSpaces } from "@/actions/workspace";
import { useQueryData } from "@/hooks/use-query-data";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import { FolderPlusIcon } from "lucide-react";
import WorkspaceForm from "@/components/forms/workspace-form";

type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);

  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "FREE" | "PRO";
      } | null;
    };
  };

  if (plan.subscription?.plan === "FREE") {
    return <></>;
  }

  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces helps you collaborate with team members. You are assigned a default person workspace where you can share videos in private with yourself."
        trigger={
          <Button className="group bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4! rounded-2xl shrink-0 grow">
            <FolderPlusIcon
              size={22}
              className="text-[#D1D1D1] group-hover:text-[#1D1D1D]"
            />
            Create a workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }
};

export default CreateWorkspace;
