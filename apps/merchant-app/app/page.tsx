"use client";

import { useBalance } from "@repo/store/balance";

export default function () {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}
// export default function Home() {

//   return (
//     <div className="bg-slate-600">hii there </div>
//   );
// }
