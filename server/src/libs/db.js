import { PrismaClient } from "../generated/prisma/index.js";

const globalForPrisma = globalThis;

/**
 * @type {import('../generated/prisma').PrismaClient}
 */

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
