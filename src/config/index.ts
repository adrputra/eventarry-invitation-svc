import { initPrismaConfig } from "./prisma.config";

export function initConfig() {
    const prismaConfig = initPrismaConfig()
    console.log(prismaConfig)
    console.log(process.env.EVENTARRY_DATABASE_URL)
}