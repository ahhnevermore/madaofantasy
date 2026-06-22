import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: (FastifyRequest, FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    user: {
      id: number;
      publicId: string;
      displayName: string | null;
    } | null;
  }
}
