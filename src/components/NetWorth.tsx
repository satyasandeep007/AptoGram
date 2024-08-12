"use client";

import React, { useEffect, useState } from "react";
import { getAccountBalance } from "../services/aptos";
import { getAPTPriceAndChange } from "@/services/coingecko";
import { FiCopy } from "react-icons/fi";

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
    <div className="flowstate-container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-black mb-6">
        Aptos Portfolio
      </h1>
      <div className="flowstate-box bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center border border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-black">Wallet Address</h2>
          <p className="text-sm font-normal text-gray-600">{parsedAddress}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiCopy size={20} />
        </button>
      </div>
      <div className="flowstate-box bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-black mb-4">Net Worth</h2>
        <p className="text-4xl font-bold text-blue-500">
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
      <div className="flowstate-box bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-black mb-4">Coins</h2>
        <ul className="space-y-4">
          {coins.map((coin, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-black"
            >
              <div className="text-lg font-semibold">{coin.symbol}</div>
              <div className="text-right">
                <div className="text-lg">{coin.amount} APT</div>
                <div className="text-sm text-gray-600">
                  ${coin.price.toFixed(2)} / APT
                </div>
                <div className="text-lg font-bold">
                  ${(coin.price * coin.amount).toFixed(2)} USD
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
