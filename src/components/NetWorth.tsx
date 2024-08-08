"use client";

import React, { useEffect, useState } from "react";
import { getAccountBalance, getAccountInfo } from "../services/aptos";

const Portfolio: React.FC<{ address: string }> = ({ address }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [coins, setCoins] = useState<
    Array<{ symbol: string; price: number; amount: number }>
  >([]);
  const [totalNetWorth, setTotalNetWorth] = useState<number | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const bal = await getAccountBalance(address);
      const accountInfo = await getAccountInfo(address);

      const coinData = [
        { symbol: "APT", price: 7.5, amount: bal.balance }, // Example price
        // Add more coins if applicable
      ];

      const totalUSD = coinData.reduce(
        (sum, coin) => sum + coin.price * coin.amount,
        0
      );

      setCoins(coinData);
      setBalance(bal.balance);
      setTotalNetWorth(totalUSD);
    };

    fetchPortfolio();
  }, [address]);

  return (
    <div className="flowstate-container mx-auto p-6 max-w-lg bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-4">
        Aptos Portfolio
      </h1>
      <div className="flowstate-box bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Net Worth</h2>
        <p className="text-3xl font-bold text-green-400">
          {totalNetWorth !== null
            ? `$${totalNetWorth.toFixed(2)} USD`
            : "Loading..."}
        </p>
      </div>
      <div className="flowstate-box bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Coins</h2>
        <ul className="space-y-2">
          {coins.map((coin, index) => (
            <li key={index} className="flex justify-between text-white">
              <span>{coin.symbol}</span>
              <span>{coin.amount} APT</span>
              <span>${(coin.price * coin.amount).toFixed(2)} USD</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
