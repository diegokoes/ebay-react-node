import { z } from "zod";

export const loginUser = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginValues = z.infer<typeof loginUser>;
