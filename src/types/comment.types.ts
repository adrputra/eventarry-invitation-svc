export interface Comment {
    id: number;
    userId: string;
    eventId: string;
    comment: string;
    createdAt: Date | null;
}