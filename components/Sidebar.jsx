"use client";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  orderBy,
  query,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { AppContext } from "../Context/AppContextProvider";

function Item({ id }) {
  const pathname = usePathname();
  let active = false;
  if (pathname.includes(id)) active = true;
  const router = useRouter();
  const { data: session } = useSession();

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email, "chats", id, "messages"),
      orderBy("createdAt", "desc")
    )
  );

  async function deleteChat() {
    await deleteDoc(doc(db, "users", session?.user?.email, "chats", id));
    router.replace("/");
  }

  return (
    <Link href={`/chat/${id}`}>
      <div
        className={`flex items-center justify-start gap-4 cursor-pointer py-4 px-2 rounded-md hover:bg-gptGray ${
          active && "bg-gptGray"
        }`}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </span>
        <span className="truncate grow">
          {messages?.docs[0]?.data().text || "New Chat"}
        </span>
        <span className="relative group " onClick={deleteChat}>
          <span className="-bottom-10 -left-9 absolute bg-slate-600 hidden z-20 text-gptWhite group-hover:block text-xs p-2  rounded">
            Delete
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function Sidebar() {
  const { isSideOpen, setIsSideOpen } = useContext(AppContext);
  const router = useRouter();
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  async function createChat() {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email, "chats"),
      {
        messages: [],
        userId: session?.user.email,
        createdAt: serverTimestamp(),
      }
    );
    router.push("/chat/" + doc.id);
  }

  return (
    <>
      <div
        className={`bg-gray-600 opacity-25 inset-0 md:hidden ${
          isSideOpen ? "fixed" : "hidden"
        }`}
        onClick={() => setIsSideOpen(false)}
      ></div>

      <div
        className={`bg-gptBlack top-0 text-sm left-0 h-screen  w-4/5 md:w-[30%] transition-all duration-300 ${
          isSideOpen ? "fixed opacity-100" : "hidden opacity-0"
        }  md:block md:top-auto md:left-auto lg:w-[20%] md:opacity-100 `}
      >
        <div className="pt-2 px-3 h-screen">
          <div
            onClick={createChat}
            className="flex items-center sticky top-0 bg-gptBlack cursor-pointer justify-start p-3 gap-4 rounded-md mb-4  border-2 border-gptBorderColor"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="text-sm text-white">New Chat</span>
          </div>
          <div className="overflow-y-scroll h-[80%] mb-7">
            {chats?.docs.map((item, index) => {
              return <Item key={item.id} id={item.id} />;
            })}
          </div>
          {/* avatar */}
          <div className="flex items-center justify-start hover:bg-gptGray p-3 rounded-md gap-4">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                width={40}
                height={40}
                alt="user_image"
                priority
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="grow">{session?.user?.name}</span>

            <span
              className="cursor-pointer relative group "
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              <span className="-top-9 absolute bg-slate-600 hidden text-gptWhite group-hover:block text-xs p-2 z-20 rounded">
                Logout
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
