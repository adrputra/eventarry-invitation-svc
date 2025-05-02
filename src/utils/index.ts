import bcrypt from "bcryptjs";
import crypto from "crypto";

export function passwordHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function passwordCompare(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

const key = crypto.createHash('sha256').update(process.env.EVENTARRY_ENCRYPTION_KEY as string).digest();

export function encrypt(data: any) {
    const iv = crypto.randomBytes(16); // Generate a random initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'), // Initialization vector
        response: encrypted,
    };
}

export function decrypt(encryptedData: any) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(encryptedData.iv, 'hex'));
    let decrypted = decipher.update(encryptedData.request, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}