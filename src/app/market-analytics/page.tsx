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
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">
        Market Analytics
      </h1>
      {marketData ? (
        <div className="relative h-96">
          <p className="text-black mb-2">Price Change (Last 30 Days):</p>
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
