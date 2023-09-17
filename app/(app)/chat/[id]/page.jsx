"use client";
import React from "react";
import Chat from "../../../../components/Chat";
import ChatInput from "../../../../components/ChatInput";
import { useSession } from "next-auth/react";
const page = (props) => {
  const {
    params: { id },
  } = props;

  return (
    <div className="flex h-[93vh] md:h-[97vh] py-2 w-full flex-col">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default page;
