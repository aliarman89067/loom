import z from "zod";

export const moveVideoSchema = z.object({
  folder_id: z.string().optional(),
  workspaceId: z.string(),
});
