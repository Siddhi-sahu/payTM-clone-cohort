"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransactions(amount: number, provider: string) {

    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "You are not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            startTime: new Date(),
            amount: amount,
            status: "Processing",
            provider,
            token: token

        }
    })

    return {
        message: "onRamp transaction added"
    }

}