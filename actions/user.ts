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
