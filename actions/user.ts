"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticatedUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
    const isExisting = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workspace: {
          where: {
            user: {
              clerkId: user.id,
            },
          },
        },
      },
    });
    if (isExisting) return { status: 200, user: isExisting };
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: {
          where: {
            user: {
              clerkId: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const notifications = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });
    if (notifications && notifications.notification.length) {
      return { status: 200, data: notifications };
    }

    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403 };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const users = await client.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            lastName: {
              contains: query,
            },
          },
        ],
        NOT: [{ clerkId: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstName: true,
        lastName: true,
        image: true,
        email: true,
      },
    });
    if (users && users.length) {
      return { status: 200, data: users };
    }
    return { status: 404, data: undefined };
  } catch (error) {
    return { status: 500, data: undefined };
  }
};

export const seachInfo = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404, data: null };
    }
    const info = await client.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
            },
          },
          {
            lastName: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            workspace: {
              some: {
                name: {
                  contains: query,
                },
              },
            },
          },
        ],
        // NOT: [
        //   {
        //     clerkId: user.id,
        //   },
        // ],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstName: true,
        lastName: true,
        image: true,
        email: true,
      },
    });
    if (info && info.length) {
      return { status: 200, data: info };
    }
    return { status: 404, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const payment = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: { plan: true },
        },
      },
    });
    if (payment) {
      return { status: 200, data: payment };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

export const enabledFirstView = async (state: boolean) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const view = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        firstView: state,
      },
    });
    if (view) {
      return { status: 200, data: "Setting updated" };
    }
  } catch (error) {
    return { status: 500 };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const userData = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (userData) {
      return { status: 200, data: userData.firstView };
    }
    return { status: 400, data: false };
  } catch (error) {
    return { status: 500 };
  }
};

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId?: string | undefined
) => {
  try {
    if (commentId) {
      const reply = await client.comment.update({
        where: {
          id: commentId,
        },
        data: {
          reply: {
            create: {
              comment,
              userId,
              videoId,
            },
          },
        },
      });
      if (reply) {
        return { status: 200, data: "Reply Posted" };
      }
    } else {
      const newComment = await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          comments: {
            create: {
              comment,
              userId,
            },
          },
        },
      });
      if (newComment) {
        return { status: 200, data: "New comment added" };
      }
    }
  } catch (error) {
    return { status: 500 };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const profileIdAndImage = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        image: true,
      },
    });
    if (profileIdAndImage) {
      return { status: 200, data: profileIdAndImage };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const getVideoComments = async (id: string) => {
  try {
    const comments = await client.comment.findMany({
      where: {
        OR: [
          {
            videoId: id,
          },
          {
            commentId: id,
          },
        ],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    return { status: 200, data: comments };
  } catch (error) {
    return { status: 404 };
  }
};
