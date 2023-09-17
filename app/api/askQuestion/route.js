import query from "../../../libs/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../../firebaseAdmin";
import { doc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { prompt, chatId, model, session } = body;

  if (!prompt) {
    return Response.json(
      { answer: "Please provide a prompt!" },
      { status: 400, statusText: "Prompt not provided!" }
    );
  }

  if (!chatId) {
    return Response.json(
      { answer: "Please provide a valid chat Id!" },
      { status: 400, statusText: "Please provide a valid chat Id!" }
    );
  }

  const response = await query(prompt, chatId, model);

  console.log(response);

  const message = {
    text: response || "ChatGPT not able to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar:
        "https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);
    
  return NextResponse.json({ answer: "testing" });
}
