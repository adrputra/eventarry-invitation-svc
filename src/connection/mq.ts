import amqp, { Channel, ChannelModel } from "amqplib";

let connection: ChannelModel | null = null;
export let channel: Channel | null = null;

export async function initRabbitMQ() {
    try {
        connection = await amqp.connect(`amqp://${process.env.EVENTARRY_RABBITMQ_USER}:${process.env.EVENTARRY_RABBITMQ_PASSWORD}@${process.env.EVENTARRY_RABBITMQ_HOST}:${process.env.EVENTARRY_RABBITMQ_PORT}`);
        console.log('[RabbitMQ] Connected');
        connection.on('error', () => console.log('Connection error'));
        connection.on('close', () => console.log('Connection close'));
        channel = await connection.createChannel();
        channel.on('error', () => console.log('Channel error'));
        channel.on('close', () => console.log('Channel close'));
        connection.on('error', (err) => {
            console.error('[RabbitMQ] Connection error:', err);
        });

        connection.on('close', () => {
            console.warn('[RabbitMQ] Connection closed. Reconnecting...');
            channel = null;
            connection = null;
            setTimeout(initRabbitMQ, 5000);
        });
    } catch (error) {
        console.error('[RabbitMQ] Connection error:', error);
        setTimeout(initRabbitMQ, 5000);
    }
}

export async function publishToQueue(queue: string, message: any): Promise<Error | null> {
    try {
        if (!channel) {
            throw new Error('Channel is not ready for publishing');
        }
        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(`[RabbitMQ] Message sent to queue: ${queue}`);
        return null;
    } catch (error) {
        console.error('[RabbitMQ] Error publishing message:', error);
        return error as Error;
    }
}

export async function disconnectRabbitMQ(): Promise<void> {
    try {
        if (channel) await channel.close();
        if (connection) await connection.close();
        console.log('Disconnected from RabbitMQ');
    } catch (error) {
        console.error('Error closing RabbitMQ:', error);
    }
}