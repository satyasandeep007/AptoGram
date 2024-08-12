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
        text: `📈 *View Your Transactions* 📉\n\nClick the button below to view your transaction history.`,
        parse_mode: "MarkdownV2",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔍 View Transactions",
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

  if (message?.text === "/investments") {
    const chatId = message.chat.id;
    const miniAppUrl = "https://apto-gram.vercel.app/investments"; // Your Mini App URL

    await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `💼 *Investment Overview* 📊\n\nClick the button below to check your investment portfolio.`,
        parse_mode: "MarkdownV2",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📈 View Investments",
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

  if (message?.text === "/market-analytics") {
    const chatId = message.chat.id;
    const miniAppUrl = "https://apto-gram.vercel.app/market-analytics"; // Your Mini App URL

    await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📊 *Market Analytics* 📉\n\nClick the button below to view the latest market trends and analytics.`,
        parse_mode: "MarkdownV2",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📉 View Market Analytics",
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
