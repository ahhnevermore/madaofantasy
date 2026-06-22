import crypto from "crypto";
import argon2 from "argon2";
import { Prisma, PrismaClient } from "@prisma/client";
import { FastifyReply } from "fastify";
import { Result } from "../utils/index.js";

// Password hashing using argon2id (async, secure)
export const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password, { type: argon2.argon2id });
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return argon2.verify(hash, password);
};

export const createUser = async (
  prisma: PrismaClient,
  email: string,
  passwordHash: string,
  displayName: string,
): Promise<Result<{ id: number; publicId: string; displayName: string | null }>> => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
      },
      select: {
        id: true,
        publicId: true,
        displayName: true,
      },
    });
    return { ok: true, val: user };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { ok: false, err: "EMAIL_EXISTS" };
    }
    throw e;
  }
};

export const setSessionCookie = (res: FastifyReply, token: string) => {
  res.setCookie("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60,
    sameSite: "lax",
  });
};

export const createSession = async (
  prisma: PrismaClient,
  userId: number,
  expiresIn: number = 7 * 24 * 60 * 60 * 1000,
) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + expiresIn);
  const tokenHash = hashToken(token);

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return token;
};
export const deleteSession = async (prisma: PrismaClient, token: string) => {
  const tokenHash = hashToken(token);
  return prisma.session.deleteMany({
    where: {
      tokenHash,
    },
  });
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
export const getSession = async (token: string, prisma: PrismaClient) => {
  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    select: {
      user: {
        select: {
          id: true,
          publicId: true,
          displayName: true,
        },
      },
      id: true,
      expiresAt: true,
    },
  });
  return session;
};
export const getAuthUserByEmail = async (prisma: PrismaClient, email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      publicId: true,
      email: true,
      passwordHash: true,
      displayName: true,
    },
  });
};
