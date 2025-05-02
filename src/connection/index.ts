import { PrismaClient } from '@prisma/client';
import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

let prisma: PrismaClient;
let redis: RedisClientType;

export async function initConnection() {
    await initDatabaseConnection();
    await initRedisConnection();
}

async function initDatabaseConnection() {
    prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'], // Enable logging for debugging
        errorFormat: 'pretty', // Use pretty error format for better readability
    });
    try {
        await prisma.$connect(); // Establish the connection
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process if the  connection fails
    }
}

async function disconnectDatabase(){
    await prisma.$disconnect();
    console.log('Disconnecting from the database');
}

async function initRedisConnection() {
    try {
        redis = createClient({
            url: `redis://${process.env.EVENTARRY_REDIS_HOST}:${process.env.EVENTARRY_REDIS_PORT}`,
        });
        await redis.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Redis Client Error', error);
        process.exit(1); // Exit the process if the  connection fails
    }
}

async function disconnectRedis() {
    await redis.quit();
    console.log('Disconnecting from Redis');
}
async function disconnect() {
    await disconnectDatabase();
    await disconnectRedis()
}

export { prisma, redis, disconnect };