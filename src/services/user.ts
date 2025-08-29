import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../utils/prisma";
import { getPublicUrl } from "../utils/url";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (user) {
    return {
      ...user,
      avatar: getPublicUrl(user.avatar),
      cover: getPublicUrl(user.cover),
    };
  }

  return null;
};

export const findUserBySlug = async (slug: string) => {
  const user = await prisma.user.findFirst({
    where: { slug },
    select: {
      avatar: true,
      cover: true,
      slug: true,
      bio: true,
      link: true,
    },
  });
  if (user) {
    return {
      ...user,
      avatar: getPublicUrl(user.avatar),
      cover: getPublicUrl(user.cover),
    };
  }

  return null;
};

export const createUser = async(data:Prisma.UserCreateInput)=>{
  const newUser = await prisma.user.create({data})
  return {
    ...newUser,
    avatar : getPublicUrl(newUser.avatar),
    cover : getPublicUrl(newUser.cover)
  }
}