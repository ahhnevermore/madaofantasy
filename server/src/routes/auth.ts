import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  createUser,
  hashPassword,
  verifyPassword,
  createSession,
  setSessionCookie,
  getAuthUserByEmail,
  deleteSession,
} from "../services/authService.js";
import { toUserDTO, getPatronym } from "../utils/index.js";

import { z } from "zod";
import { userInfo } from "os";

const LoginSchema = z.strictObject({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export async function authRoutes(app: FastifyInstance) {
  app.register(authPublic);
  app.register(authProtected);
}
async function authPublic(app: FastifyInstance) {
  app.post("/register", async (req: FastifyRequest, res: FastifyReply) => {
    let schema = LoginSchema.parse(req.body);
    let passwordHash = await hashPassword(schema.password);
    let result = await createUser(
      req.server.prisma,
      schema.email,
      passwordHash,
      "Anonymous " + getPatronym(),
    );
    if (!result.ok) {
      req.log.warn(`register user conflict`);
      return res.code(409).send(result.err);
    } else {
      const token = await createSession(req.server.prisma, result.val.id);
      setSessionCookie(res, token);
      req.log.info(`register: user ${result.val.publicId} registered`);
      return res.code(200).send({ user: toUserDTO(result.val) });
    }
  });

  // Login endpoint
  app.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
    let schema = LoginSchema.parse(req.body);

    const user = await getAuthUserByEmail(req.server.prisma, schema.email);
    if (!user || !user.passwordHash) {
      req.log.warn(`login: invalid credentials ${user?.publicId || "no user found"}`);
      return res.status(401).send({ error: "Invalid credentials" });
    }
    if (!(await verifyPassword(schema.password, user.passwordHash))) {
      req.log.warn(`login: invalid password for ${user.publicId}`);
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = await createSession(req.server.prisma, user.id);
    setSessionCookie(res, token);
    req.log.info(`login: ${user.publicId} logged in`);
    return res.send({ user: toUserDTO(user) });
  });
}

async function authProtected(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/me", async (req: FastifyRequest, res: FastifyReply) => {
    if (req.user) {
      return res.send({ user: toUserDTO(req.user) });
    }
  });

  app.post("/logout", async (req: FastifyRequest, res: FastifyReply) => {
    if (req.cookies.session) {
      await deleteSession(req.server.prisma, req.cookies.session);
      req.log.info(`logout: user ${req.user?.publicId} logged out`);
      res.clearCookie("session");
      return res.code(200).send("Logged out successfully");
    }
  });
}
