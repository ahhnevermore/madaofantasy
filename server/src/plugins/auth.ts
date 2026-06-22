import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { getSession } from "../services/authService.js";

export default fp(async (app) => {
  app.decorate("authenticate", async (req: FastifyRequest, res: FastifyReply) => {
    const token = req.cookies.session;
    if (!token) {
      res.code(401).send();
      return;
    }
    const session = await getSession(token, req.server.prisma);
    if (!session || session.expiresAt < new Date()) {
      res.code(401).send();
      return;
    }
    req.user = session.user;
  });
});
