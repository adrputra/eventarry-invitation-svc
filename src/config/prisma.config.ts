export function initPrismaConfig() {
    process.env.EVENTARRY_DATABASE_URL = `mysql://${process.env.EVENTARRY_DATABASE_USER}:${process.env.EVENTARRY_DATABASE_PASSWORD}@${process.env.EVENTARRY_DATABASE_HOST}:${process.env.EVENTARRY_DATABASE_PORT}/${process.env.EVENTARRY_DATABASE_NAME}`
}
