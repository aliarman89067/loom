export type WorkspaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    workspace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
    members: {
      workspace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};

export type NotificationsProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type FolderProps = {
  status: number;
  data: {
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
  };
};

export type VideosProps = {
  status: number;
  data: {
    user: {
      firstName: string | null;
      lastName: string | null;
      image: string | null;
    } | null;
    id: string;
    processing: boolean;
    folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};
