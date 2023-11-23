import { PrismaClient } from "@prisma/client";
// import "server-only";

declare global {
  var cachedPrisma: PrismaClient;
}

export const db = (() => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  return global.cachedPrisma;
})();
