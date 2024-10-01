
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

//export a get function
export const GET = async () => {
    try {
        // that gets the current session from nextauth(ie is the person logged in?)
        const session = await getServerSession(authOptions);
        //if they are logged in get them their details
        if (session.user) {
            return NextResponse.json({
                user: session.user
            })
        }

    } catch (e) {
        return NextResponse.json({
            msg: "You are not logged in!"
        }, {
            status: 403
        })

    }

    return NextResponse.json({
        msg: "You are not logged in!"
    }, {
        status: 403
    })

}