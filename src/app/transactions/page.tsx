"use client";

import { getAccountBalance, getAccountTransactions } from "@/services/aptos";
import React, { useEffect, useState } from "react";

const Transactions: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const userAddress =
    "0x77f5248f6d3205a752651121853b2a4e43eedc5398d0cc58216810742c767888"; // Replace with dynamic data

  useEffect(() => {
    // Fetch the data from the API or use mockData directly
    const fetchData = async () => {
      // Replace with actual API call
      const dar = await getAccountTransactions(userAddress);
      setData(dar);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // const coinBalance = parseInt(data.coin.value) / 1e8; // Convert to APT
  // const depositEvents = data.deposit_events.counter;
  // const withdrawalEvents = data.withdraw_events.counter;

  return (
    <div className="flowstate-container mx-auto p-4 max-w-md bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-4">
        Transaction History
      </h1>
      {data.length > 0 ? (
        <div className="flowstate-box bg-gray-800 p-6 rounded-lg shadow-md">
          {data.map((tx: any, index: any) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-700 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-300 mb-2">
                Transaction {index + 1}
              </h2>
              <p className="text-sm text-gray-400">
                <strong>Type:</strong> {tx.type}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Amount:</strong> {parseInt(tx.data.amount) / 1e8} APT
              </p>
              <p className="text-sm text-gray-400">
                <strong>Sequence Number:</strong> {tx.sequence_number}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Transaction Hash:</strong> {tx.transaction_version}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
