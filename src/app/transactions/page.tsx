"use client";

import { getAccountTransactions } from "@/services/aptos";
import React, { useEffect, useState } from "react";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const userAddress =
    "0x77f5248f6d3205a752651121853b2a4e43eedc5398d0cc58216810742c767888"; // Replace with dynamic data

  useEffect(() => {
    const fetchData = async () => {
      // Replace with actual API call
      const txs = await getAccountTransactions(userAddress);

      // Sort transactions by sequence_number in descending order
      const sortedTxs = txs.sort(
        (a: any, b: any) => b.sequence_number - a.sequence_number
      );
      setTransactions(sortedTxs);
    };

    fetchData();
  }, []);

  if (transactions.length === 0) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flowstate-container mx-auto p-6 max-w-md bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center text-white mb-6">
        Transaction History
      </h1>
      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((tx: any, index: number) => {
            // Determine type of transaction and amount color
            const isDeposit = tx.type === "0x1::coin::DepositEvent";
            const amountColor = isDeposit ? "text-green-400" : "text-red-400";
            const typeSymbol = isDeposit ? "+" : "-";
            const transactionDate = new Date(
              tx.transaction_block_height * 1000
            ).toLocaleDateString(); // Convert block height to date

            return (
              <a
                key={index}
                href={`https://explorer.aptoslabs.com/txn/${tx.transaction_version}?network=testnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xl font-semibold ${amountColor} flex items-center`}
                  >
                    {typeSymbol} {parseInt(tx.data.amount) / 1e8} APT
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Transaction Hash:</strong> {tx.transaction_version}
                </p>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
