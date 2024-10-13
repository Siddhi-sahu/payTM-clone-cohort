
import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {

    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);
// import express from "express";
// import db from "@repo/db/client";

// const app = express();
// app.use(express.json())

// app.post("/hdfcWebhook", async (req, res) => {
//     const paymentInformation = {
//         token: req.body.token,
//         userId: Number(req.body.user_identifier),
//         amount: Number(req.body.amount)
//     }

//     try {
//         await db.$transaction([
//             db.balance.updateMany({
//                 where: {
//                     userId: paymentInformation.userId
//                 },
//                 data: {
//                     amount: {
//                         increment: paymentInformation.amount
//                     }
//                 }
//             }),

//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token
//                 },
//                 data: {
//                     status: "Success"
//                 }
//             })


//         ])



//         //super imp to tell the hdfc/banks the status code 200 so that they dont feel like the req(user data updation) failed
//         res.json({
//             msg: "captured"
//         })

//     } catch (e) {
//         console.log(e)
//         res.status(411).json({
//             message: "Error while processing webhook"

//         })

//     }

// })


// app.listen(3003)