import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

export const getAccountBalance = async (accountAddress: string) => {
  const accountData = await aptos.getAccountResource({
    accountAddress,
    resourceType: COIN_STORE,
  });
  console.log(accountData, "accountData");
  const balance = accountData.coin.value / 100000000;

  return { accountData, balance };
};

export const getAPRData = async (accountAddress: string) => {};

export const getAccountInfo = async (accountAddress: string) => {
  const fund = await aptos.getAccountInfo({ accountAddress });
  console.log(fund, "accountInfo");

  return fund;
};

export async function getAccountTransactions(accountAddress: any) {
  try {
    const transactions = await aptos.getAccountEventsByCreationNumber({
      accountAddress,
      creationNumber: 2,
    });
    console.log(transactions, " transactions");

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}
