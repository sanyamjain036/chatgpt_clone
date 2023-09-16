'use client'
import { signIn } from "next-auth/react";
import React from "react";

const LoginPage = () => {

  return (
  <div className="h-screen">
  <button onClick={() => signIn("google")}>Login</button>
  </div>
  );
};

export default LoginPage;
