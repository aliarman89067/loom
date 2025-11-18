"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkSpace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            user: {
              clerkId: user.id,
            },
          },
          {
            members: {
              some: {
                user: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return { status: 200, data: { workspace: isUserInWorkspace } };
  } catch (error) {
    return { status: 500, data: { workspace: null } };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: { videos: true },
        },
      },
    });
    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const videos = await client.video.findMany({
      where: {
        OR: [
          {
            workSpaceId,
          },
          {
            folderId: workSpaceId,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 403 };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const workSpaces = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            workSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (workSpaces) {
      return { status: 200, data: workSpaces };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 403 };
  }
};

export const createWorkSpace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const authorized = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PERSONAL",
            },
          },
        },
      });
      if (workspace) {
        return { status: 201, data: "Workspace Created." };
      }
    }
    return {
      status: 401,
      data: "You are not authorized to create a workspace",
    };
  } catch (error) {
    return { status: 500 };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });
    if (folder) {
      return { status: 200, data: "Folder renamed" };
    }
    return { status: 400, data: "Folder does not exist" };
  } catch (error) {
    return { status: 500, data: "Something went wrong" };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const isNewFolder = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: { name: "Untitled" },
        },
      },
    });
    if (isNewFolder) {
      return { status: 200, message: "New folder created" };
    }
    return { status: 200, message: "New folder created" };
  } catch (error) {
    return { status: 500, message: "Something went wrong" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folderInfo = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        id: true,
        name: true,
        videos: true,
        _count: {
          select: {
            videos: true,
          },
        },
        createdAt: true,
      },
    });
    if (folderInfo) {
      return { status: 200, data: folderInfo };
    }
    return { status: 400, data: null };
  } catch (error) {
    return { status: 500 };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workSpaceId: string,
  folderId: string
) => {
  try {
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId,
      },
    });
    if (location) return { status: 200, data: "Folder changed successfully" };
    return { status: 404, data: "Workspace/Folder not found" };
  } catch (error) {
    return { status: 500, data: "Something went wrong" };
  }
};

export const getRecentVideos = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401, data: "Unauthorized user" };
    }
    const videos = await client.video.findMany({
      where: {
        workSpaceId: workspaceId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    if (videos && videos.length) {
      return { status: 200, data: videos };
    }
    return { status: 404, data: null };
  } catch (error) {
    return { status: 500 };
  }
};

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 400 };

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        views: true,
        summery: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            clerkId: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });
    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.user?.clerkId ? true : false,
      };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
