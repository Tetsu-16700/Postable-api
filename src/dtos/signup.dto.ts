import { z } from "zod";

export const signupDTO = z.object({
  username: z.string(),
  password: z.string(),
});
