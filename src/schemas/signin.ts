import { z } from "zod";

export const signinSchema = z.object({
  email: z.email({ message: "E-mail é obrigatório"}),
  password: z.string({ message: "Senha é obrigatória" }).min(4)
});
