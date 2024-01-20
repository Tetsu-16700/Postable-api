import { z } from "zod";

export const createPostDTO = z.object({
  content: z.string(),
});
