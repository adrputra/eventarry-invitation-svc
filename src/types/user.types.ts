export interface User {
    userId: string;
    fullName: string;
    shortName: string;
    password: string;
    branchCode: string;
    levelId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    user: User;
}