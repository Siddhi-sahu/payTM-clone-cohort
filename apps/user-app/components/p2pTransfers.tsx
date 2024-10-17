import { Card } from "@repo/ui/card"

export const P2pTransctions = ({ transactions }: {
    transactions: {
        amount: number,
        timestamp: Date,

    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Tranactions">
            <div className="text-center pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Sent INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.timestamp.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>

    </Card>

}