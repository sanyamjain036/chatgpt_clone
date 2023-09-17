"use client";
import React from "react";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const ChatItem = ({ message }) => {
  const isgpt = message.user.name === "ChatGPT";

  return (
    <div className={`   text-white  py-5 ${isgpt ? "bg-gptLightGray" : ""}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <Image
          src={message.user.avatar}
          width={40}
          height={30}
          alt="avatar"
          className="h-8 w-8 "
        />
        <span className="pt-1 text-sm">{message.text}</span>
      </div>
    </div>
  );
};

const Chat = ({ chatId }) => {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className="grow overflow-y-auto">
      {messages?.docs.map((message) => (
        <ChatItem key={message.id} message={message.data()} />
      ))}
    </div>
  );
};

export default Chat;
