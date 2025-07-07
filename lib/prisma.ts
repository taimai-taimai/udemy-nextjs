import { PrismaClient } from "./prisma/generated"
import { withAccelerate } from "@prisma/extension-accelerate"

type PrismaClientWithExtensions = ReturnType<typeof createPrismaClient>

const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate())
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClientWithExtensions
}

const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
