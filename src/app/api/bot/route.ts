import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body, "body");

  const { message } = body;

  try {
    if (message?.text === "/transactions") {
      const chatId = message.chat.id;
      const miniAppUrl = "https://apto-gram.vercel.app/transactions"; // Your Mini App URL

      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Click the button below to view your transaction history.`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "View Transactions",
                  web_app: {
                    url: miniAppUrl,
                  },
                },
              ],
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      return NextResponse.json({ status: "ok" });
    }

    if (message?.text === "/investments") {
      const chatId = message.chat.id;
      const miniAppUrl = "https://apto-gram.vercel.app/investments"; // Your Mini App URL

      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Click the button below to check your investment portfolio.`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "View Investments",
                  web_app: {
                    url: miniAppUrl,
                  },
                },
              ],
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      return NextResponse.json({ status: "ok" });
    }

    if (message?.text === "/analytics") {
      const chatId = message.chat.id;
      const miniAppUrl = "https://apto-gram.vercel.app/market-analytics"; // Your Mini App URL

      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Click the button below to view the latest market trends and analytics.`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "View Market Analytics",
                  web_app: {
                    url: miniAppUrl,
                  },
                },
              ],
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      return NextResponse.json({ status: "ok" });
    }

    return NextResponse.json({ status: "unhandled message" });
  } catch (error: any) {
    console.error("Error handling the request:", error.message);
    return NextResponse.json({ status: "error", message: error.message });
  }
}
