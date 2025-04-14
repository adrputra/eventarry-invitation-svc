import bcrypt from "bcryptjs";
export function passwordHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function passwordCompare(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}