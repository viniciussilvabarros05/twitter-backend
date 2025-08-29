import { RequestHandler } from "express";
import { signupSchema } from "../schemas/signup";
import { findUserByEmail, findUserBySlug, createUser } from "../services/user";
import slug from "slug";
import { compare, hash } from "bcrypt-ts";
import { createJWT } from "../utils/jwt";
import { signinSchema } from "../schemas/signin";

export const signup: RequestHandler = async (req, res) => {
  const safeData = signupSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.json({ error: safeData.error.flatten().fieldErrors });
  }

  try {
    const hasEmail = await findUserByEmail(safeData.data.email);
    if (hasEmail) {
      return res.json({ error: "Email já existe" });
    }
    let genSlug = true;
    let userSlug = slug(safeData.data.name);

    while (genSlug) {
      const hasSlung = await findUserBySlug(userSlug);

      if (hasSlung) {
        let slugSuffix = Math.floor(Math.random() * 999999).toString();
        userSlug = slug(safeData.data.name + slugSuffix);
      } else {
        genSlug = false;
      }
    }
    const hashPassword = await hash(safeData.data.password, 10);

    const newUser = await createUser({
      slug: userSlug,
      name: safeData.data.name,
      email: safeData.data.email,
      password: hashPassword,
    });

    const token = createJWT(userSlug);
    res.status(201).json({
      token,
      user: {
        name: newUser.name,
        slug: newUser.slug,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    res.json(error);
  }
};

export const signin: RequestHandler = async (req, res) => {
  const safeData = signinSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.json({ error: safeData.error.flatten().fieldErrors });
  }

  const user = await findUserByEmail(safeData.data.email);
  if (!user) return res.status(401).json({ error: "Acesso negado" });

  const verifyPass = await compare(safeData.data.password, user.password);

  if (!verifyPass) return res.status(401).json({ error: "Acesso negado" });

  const token = createJWT(user.slug);

  res.json({
    token,
    user: {
      name: user.name,
      avatar: user.avatar,
      slug: user.slug,
    },
  });
};
