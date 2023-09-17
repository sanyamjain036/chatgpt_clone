"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const layout = ({ children }) => {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  return (
    <>
      <Navbar />
      <div className="md:flex ">
        <Sidebar />
        <main className="min-h-screen w-full">{children}</main>
      </div>
    </>
  );
};

export default layout;
