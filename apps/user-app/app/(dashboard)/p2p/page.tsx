import { getServerSession } from "next-auth";
import { P2pTransctions } from "../../../components/p2pTransfers";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getp2ptransfers() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }

    });

    return txns.map(t => ({
        timestamp: t.timestamp,
        amount: t.amount
    }))
}
export default async function () {
    const balance = await getBalance();
    const transactions = await getp2ptransfers()
    return (
        <div className="w-full p-6">
            {/* <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Send Money
            </div> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="mt-0">

                        <SendCard />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="mt-4">
                        <P2pTransctions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );

}