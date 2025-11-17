import React from "react";
import Modal from "../modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "@/components/forms/change-video-location";

type Props = {
  videoId: string;
  workspaceId: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  workspaceId,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to new workspace/folder"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our severs."
      trigger={<Move size={18} fill="#a4a4a4" className="text-[#a4a4a4]" />}
    >
      <ChangeVideoLocation
        videoId={videoId}
        workspaceId={workspaceId}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default CardMenu;
