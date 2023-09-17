"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

const ChatInput = ({ chatId }) => {
  const [prompt, setPrompt] = useState("");
  let active = prompt?.length > 2;
  const model = "gpt-3.5-turbo";
  const { data: session } = useSession();

  useEffect(() => {
    const keyDownHandler = event => {

      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const sendMessage = async () => {
    if (!prompt || !active) return;
    const trimmed = prompt.trim();
    const message = {
      text: trimmed,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email,
        name: session?.user?.name,
        avatar:
          session?.user?.image ||
          "https://ui-avatars.com/api/?name=" + session?.user?.name,
      },
    };

    try {
      await addDoc(
        collection(
          db,
          "users",
          session?.user?.email,
          "chats",
          chatId,
          "messages"
        ),
        message
      );
      setPrompt("");
      const data = {
        prompt: trimmed,
        chatId,
        model: model,
        session,
      };

      await fetch("/api/askQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div className="flex items-center shadow-[-5px_3px_74px_5px_#1a202c] bg-gptLightGray rounded-md w-[75%] mx-auto px-3">
      <input
        type="text"
        className="py-4 px-2 text-sm grow text-gptSlate bg-transparent outline-none"
        placeholder="Send a message"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <span
        onClick={sendMessage}
        className={`${active ? "bg-green-600" : ""} p-1 rounded-md`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-6 h-6 ${active ? "text-white cursor-pointer" : ""} `}
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </span>
    </div>
  );
};

export default ChatInput;
