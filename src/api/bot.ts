import { NextApiRequest, NextApiResponse } from "next";
import { Telegraf } from "telegraf";

const BOT_TOKEN: any = process.env.TELEGRAM_BOT_TOKEN; // Replace with your bot token
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx: { reply: (arg0: string) => any }) =>
  ctx.reply("Welcome! Use /getTransactions to see your transactions.")
);
bot.command(
  "transactions_temp",
  async (ctx: {
    chat: { id: any };
    replyWithMarkdown: (arg0: string) => any;
  }) => {
    const chatId = ctx.chat?.id;
    if (chatId) {
      const message =
        "Click here to view your transactions: [View Transactions](https://apto-gram.vercel.app/transactions)";
      await ctx.replyWithMarkdown(message);
    }
  }
);

const f = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Handle the update
      await bot.handleUpdate(req.body);
      res.status(200).send("OK");
    } catch (error) {
      console.error("Error handling update:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

export default f;
