import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";

const AuthLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return <>{children}</>;
};

export default AuthLayout;
