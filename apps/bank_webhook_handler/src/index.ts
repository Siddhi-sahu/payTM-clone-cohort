import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),

            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })


        ])



        //super imp to tell the hdfc/banks the status code 200 so that they dont feel like the req(user data updation) failed
        res.json({
            msg: "captured"
        })

    } catch (e) {
        console.log(e)
        res.status(411).json({
            message: "Error while processing webhook"

        })

    }

})


app.listen(3003)