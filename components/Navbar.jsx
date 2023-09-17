"use client";
import { useRouter } from "next/navigation";
import { AppContext } from "../Context/AppContextProvider";
import React, { useContext } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

function Navbar() {
  const { setIsSideOpen } = useContext(AppContext);
  const router = useRouter();
  const { data: session } = useSession();

  async function createChat() {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email, "chats"),
      {
        userId: session?.user.email,
        createdAt: serverTimestamp(),
      }
    );
    router.push("/chat/" + doc.id);
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 md:hidden border-b-gptBorderColor border-b-2">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gptWhite cursor-pointer focus:ring-4 focus:ring-white"
          onClick={() => setIsSideOpen((prev) => !prev)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <h3 className="text-sm text-gptWhite grow text-center">New Chat</h3>
      <div onClick={createChat} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gptWhite"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
}

export default Navbar;
