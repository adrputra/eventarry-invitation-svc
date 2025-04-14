import { initConfig } from "./config";
import express from 'express';
import { disconnect, initConnection } from "./connection";
import { initRouter } from "./route";
import { decryptMiddleware, encryptMiddleware } from "./middleware";

async function main() {
    initConfig()
    initConnection()

    const app = express();
    const PORT = process.env.PORT || 3000;
    app.use(express.json());
    app.use(decryptMiddleware)
    app.use(encryptMiddleware)
    
    initRouter(app)


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main().catch(async (error) => {
    console.error('Error starting the application:', error);
    await disconnect();
    process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await disconnect(); // Disconnect from the database
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Shutting down...');
    await disconnect(); // Disconnect from the database
    process.exit(0);
});