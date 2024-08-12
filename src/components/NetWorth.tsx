"use client";

import React, { useEffect, useState } from "react";
import { getAccountBalance } from "../services/aptos";
import { getAPTPriceAndChange } from "@/services/coingecko";
import { FiCopy } from "react-icons/fi"; // Import the copy icon

const Portfolio: React.FC<{ address: string }> = ({ address }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [coins, setCoins] = useState<
    Array<{ symbol: string; price: number; amount: number }>
  >([]);
  const [totalNetWorth, setTotalNetWorth] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const parsedAddress = `${address.slice(0, 10)}.......${address.slice(-10)}`;

  useEffect(() => {
    const fetchPortfolio = async () => {
      const bal = await getAccountBalance(address);
      const _priceChange = await getAPTPriceAndChange();

      const coinData = [
        { symbol: "APT", price: _priceChange.price, amount: bal.balance },
        // Add more coins if applicable
      ];

      const totalUSD = coinData.reduce(
        (sum, coin) => sum + coin.price * coin.amount,
        0
      );

      setCoins(coinData);
      setBalance(bal.balance);
      setTotalNetWorth(totalUSD);
      setPriceChange(_priceChange.change24h);
    };

    fetchPortfolio();
  }, [address]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="flowstate-container mx-auto p-6 max-w-lg bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        Aptos Portfolio
      </h1>
      <div className="flowstate-box bg-gray-800 p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-300">
            Wallet Address
          </h2>
          <p className="text-sm font-normal text-gray-400">{parsedAddress}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <FiCopy size={20} />
        </button>
      </div>
      <div className="flowstate-box bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Net Worth</h2>
        <p className="text-4xl font-bold text-green-400">
          {totalNetWorth !== null
            ? `$${totalNetWorth.toFixed(2)} USD`
            : "Loading..."}
        </p>
        {priceChange !== null && (
          <p
            className={`text-lg mt-2 ${
              priceChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}% (24h)
          </p>
        )}
      </div>
      <div className="flowstate-box bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Coins</h2>
        <ul className="space-y-4">
          {coins.map((coin, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-white"
            >
              <div className="text-lg font-semibold">{coin.symbol}</div>
              <div className="text-right">
                <div className="text-lg">{coin.amount} APT</div>
                <div className="text-sm text-gray-400">
                  ${coin?.price?.toFixed(2)} / APT
                </div>
                <div className="text-lg font-bold">
                  ${(coin?.price * coin?.amount).toFixed(2)} USD
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
