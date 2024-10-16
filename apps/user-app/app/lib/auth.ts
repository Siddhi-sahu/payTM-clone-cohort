// import db from "@repo/db/client";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// export const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: 'Phone',
//             credentials: {
//                 number: { label: "Phone Number", type: "text", placeholder: "1231231231", required: true },
//                 password: { label: "Password", type: "password", placeholder: "password", required: true }
//             },

//             //any time user click on sign in with submit button suthorize function is called and user details reach credentials argument
//             //credentials.password is the password that the user put in and credentials.phone is the phone that user put in
//             async authorize(credentials: any) {
//                 const hashedPassword = await bcrypt.hash(credentials.password, 10)
//                 const existingUser = await db.user.findFirst({
//                     where: {
//                         number: credentials.number
//                     }
//                 });
//                 if (existingUser) {
//                     //bcryt.hash produces different hashes for same password
//                     const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
//                     //telling next-auth the user with this id, name and email has logged in and next-auth will take care of setting the cookies and if that is not the case with the return null statement we tell the next auth dont let the user login
//                     if (passwordValidation) {
//                         return {
//                             id: existingUser.id.toString(),
//                             name: existingUser.name,
//                             email: existingUser.number
//                         }
//                     }
//                     return null
//                 }

//                 try {
//                     const user = await db.user.create({
//                         data: {
//                             number: credentials.number,
//                             password: hashedPassword
//                         }
//                     });
//                     //login logic this is
//                     return {
//                         id: user.id.toString(),
//                         name: user.name,
//                         email: user.number
//                     }

//                 } catch (err) {
//                     console.log(err)
//                 }
//                 return null;
//             }
//         })
//     ],
//     secret: process.env.JWT_SECRET || "secret",
//     callbacks: {
//         async session({ token, session }: any) {
//             session.user.id = token.sub

//             return session
//         }
//     }
// }

import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Phone',
            credentials: {
                number: { label: "Phone Number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", placeholder: "password", required: true }
            },

            //any time user click on sign in with submit button suthorize function is called and user details reach credentials argument
            //credentials.password is the password that the user put in and credentials.phone is the phone that user put in
            async authorize(credentials: any) {
                const hashedPassword = await bcrypt.hash(credentials.password, 10)
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.number
                    }
                });
                if (existingUser) {
                    //bcryt.hash produces different hashes for same password
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    //telling next-auth the user with this id, name and email has logged in and next-auth will take care of setting the cookies and if that is not the case with the return null statement we tell the next auth dont let the user login
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.number,
                            password: hashedPassword
                        }
                    });
                    const balance = await db.balance.create({
                        data: {
                            userId: user.id,
                            amount: 0,
                            locked: 0,
                        },
                    });
                    //login logic this is
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }

                } catch (err) {
                    console.log(err)
                }
                return null;
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}