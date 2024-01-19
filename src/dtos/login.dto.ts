import { z } from "zod";

export const loginDTO = z.object({
  username: z.string(),
  password: z.string(),
});
