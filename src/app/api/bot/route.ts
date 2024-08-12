import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body, "body");

  const { message } = body;

  if (message?.text === "/transactions") {
    const chatId = message.chat.id;
    const miniAppUrl = "https://apto-gram.vercel.app/transactions"; // Your Mini App URL

    await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Click the button below to view your transactions.`,
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

    return NextResponse.json({ status: "ok" });
  }

  return NextResponse.json({ status: "unhandled message" });
}
