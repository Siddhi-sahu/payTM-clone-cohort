"use client"

import { useBalance } from "@repo/store/useBalance"
export default function Home() {
  const balance = useBalance();
  return (
    <div className="bg-slate-600">hii there {balance}</div>
  );
}
