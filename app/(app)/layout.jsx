import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const layout = async({ children }) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/signin");
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
