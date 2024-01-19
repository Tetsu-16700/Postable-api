import { z } from "zod";

export const editUserDTO = z.object({
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
