"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getAccountBalance, getStakingPositions } from "@/services/aptos";

const Investments: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null); // Placeholder for balance
  const [positions, setPositions] = useState<any[]>([]); // Placeholder for positions
  const userAddress =
    "0x77f5248f6d3205a752651121853b2a4e43eedc5398d0cc58216810742c767888"; // Replace with dynamic data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current price
        const priceResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/aptos"
        );
        setPrice(priceResponse.data.market_data.current_price.usd);

        // Fetch historical market data (for APR or incentive changes)
        const bal: any = await getAccountBalance(userAddress);
        setBalance(parseInt(bal.balance)); // Convert from micro-units to APT

        const positions = await getStakingPositions(userAddress);
        setPositions(
          positions.map((position: any) => ({
            type: position.type,
            amount: position.amount,
            value: position.value,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white text-black rounded-lg shadow-lg border border-gray-200 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Investment Overview
      </h1>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Current Price</h2>
        <p className="text-2xl font-bold text-blue-600">
          ${price !== null ? price.toFixed(2) : "Loading..."}
        </p>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Balance</h2>
        <p className="text-2xl font-bold text-pink-600">
          {balance !== null ? `${balance} APT` : "Loading..."}
        </p>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Positions</h2>
        <ul className="space-y-2">
          {positions.map((position, index) => (
            <li key={index} className="text-black">
              <span className="font-bold">{position.type}:</span>{" "}
              <span className="text-blue-600">
                {position.amount} APT (${position.value})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Investments;
