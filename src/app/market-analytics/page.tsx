"use client";

import React, { useState, useEffect } from "react";
import PriceChangeChart from "@/components/Chart";
import axios from "axios";

const MarketAnalytics: React.FC = () => {
  const [marketData, setMarketData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketChartResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/aptos/market_chart?vs_currency=usd&days=30"
        );
        setMarketData(marketChartResponse.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-4">Market Analytics</h1>
      {marketData ? (
        <div className="relative h-64">
          <p className="text-white mb-2">Price Change (Last 30 Days):</p>
          <div className="absolute inset-0">
            <PriceChangeChart tokenId="aptos" />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading historical data...</p>
      )}
    </div>
  );
};

export default MarketAnalytics;
