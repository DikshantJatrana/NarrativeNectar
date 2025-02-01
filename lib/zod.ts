import { z } from "zod";

const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupValidator = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export { loginValidator, signupValidator };
