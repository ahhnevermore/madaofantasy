import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyCors from "@fastify/cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({ logger: true });

const start = async () => {
  try {
    // Register plugins
    await app.register(fastifyCors, { origin: true });

    // Static files (served from server/public)
    await app.register(fastifyStatic, {
      root: path.resolve(__dirname, "./public"),
      prefix: "/",
      decorateReply: true, // needed for reply.sendFile()
    });

    // Health check
    app.get("/api/health", async () => ({ status: "ok" }));

    // SPA fallback
    app.setNotFoundHandler(async (req, reply) => {
      reply.sendFile("index.html");
    });

    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });
    console.log(`Server running at http://localhost:3000`);
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

start();
