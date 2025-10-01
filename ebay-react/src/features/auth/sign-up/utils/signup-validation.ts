import * as z from "zod";

export const signupUser = z.object({
  firstName: z
    .string()
    .min(5, { message: "First name of at least 5 characters" })
    .max(20, { message: " " }),
  lastName: z.string(),
  email: z.email(),
  passwords: z.pass
});

export type signupValues = z.infer<typeof signupUser>;
