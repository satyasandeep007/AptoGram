import axios from "axios";

export async function getAPTPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd"
    );
    return response.data.aptos.usd;
  } catch (error) {
    console.error("Error fetching APT price:", error);
    return null;
  }
}

export async function getAPTPriceAndChange() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd&include_24hr_change=true"
    );
    return {
      price: response.data.aptos.usd,
      change24h: response.data.aptos.usd_24h_change,
    };
  } catch (error) {
    console.error("Error fetching APT price and change:", error);
    return { price: null, change24h: null };
  }
}

export const getHistoricalPrices = async (tokenId: string) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=30`
    );
    return response.data.prices; // Array of [timestamp, price]
  } catch (error) {
    console.error("Error fetching historical prices:", error);
    return [];
  }
};
