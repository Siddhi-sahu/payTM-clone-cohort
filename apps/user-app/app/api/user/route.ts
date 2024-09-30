import prisma from "@repo/db/client";

import { NextResponse } from "next/server";

export const GET = async () => {
    await prisma.user.create({
        data: {
            email: "hiii",
            name: "there",
            number: "8882838482",
            password: "12445"
        }
    })
    return NextResponse.json({
        msg: "hi there"
    })

}