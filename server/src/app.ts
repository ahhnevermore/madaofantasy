import Fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

import prismaPlugin from "./plugins/prisma.js";
import authPlugin from "./plugins/auth.js";
import { authRoutes } from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(fastifyCookie);
  app.register(fastifyCors, { origin: true, credentials: true });
  app.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    decorateReply: true, // needed for reply.sendFile()
  });

  app.register(prismaPlugin);
  app.register(authPlugin);

  app.register(authRoutes, { prefix: "/api/v1/auth" });

  app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith("/api/")) {
      return reply.status(404).send({
        error: "NOT_FOUND",
      });
    }
    return reply.sendFile("index.html");
  });

  app.setErrorHandler((error: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
    req.log.error(
      {
        err: error,
        url: req.url,
        method: req.method,
      },
      "request error",
    );

    // Zod validation errors
    if (error.name === "ZodError") {
      return reply.status(400).send({
        error: "INVALID_REQUEST",
      });
    }

    // Default fallback
    return reply.status(500).send({
      error: "INTERNAL_SERVER_ERROR",
    });
  });
  return app;
}
