import { z } from "zod";

export const editPostDTO = z.object({
  content: z.string(),
});
