import NextAuth from "next-auth/next";
import { authOptions } from "../../../lib/auth";

const handler = NextAuth(authOptions);

//same as export const GET = handler; export const POST = handler (any request that is comming as get and post got to handler )
export { handler as GET, handler as POST }