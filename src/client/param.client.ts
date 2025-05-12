import { prisma } from "../connection"
import { Parameter } from "../types/param.types";

export async function getParamClient(key: string): Promise<{ params: Parameter | null; err: Error | null }> {
    try {
        const params = await prisma.parameters.findFirst({
            select: {
                key: true,
                value: true,
                description: true
            }
        })
        return { params, err: null }
    } catch (error) {
        console.error(error)
        return { params: null, err: error as Error }
    }
}