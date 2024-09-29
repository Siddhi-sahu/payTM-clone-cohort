import prisma from "@repo/db/client";

import { NextResponse } from "next/server";

export const GET = async () => {
    await prisma.user.create({
        data: {
            email: "asf",
            name: "dfdfdf"
        }
    })
    return NextResponse.json({
        msg: "hi there"
    })

}