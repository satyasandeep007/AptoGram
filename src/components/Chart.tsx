"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getHistoricalPrices } from "@/services/coingecko";

const PriceChangeChart: React.FC<{ tokenId: string }> = ({ tokenId }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const prices = await getHistoricalPrices(tokenId);
      const formattedData = prices.map((price: [number, number]) => ({
        date: new Date(price[0]).toLocaleDateString(),
        price: price[1],
      }));
      setData(formattedData);
    };

    fetchData();
  }, [tokenId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-black mb-4">
        Price Change (Last 30 Days)
      </h2>
      {data.length > 0 ? (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      ) : (
        <p className="text-gray-500">Loading historical data...</p>
      )}
    </div>
  );
};

export default PriceChangeChart;
