"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/signin-confirm`,
    // This must be true.
    handleCodeInApp: true,
  };

  const login = (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        window.prompt("Check your email!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        window.prompt(errorMessage)
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gptGray">
      <div className="bg-gptLightGray p-8 rounded shadow-md w-80">
        <div className="flex items-center gap-5 mb-6">
          <img
            className="h-10 w-auto"
            src="https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png"
            alt="Your Company"
          />
          <h2 className="text-2xl font-semibold">ChatGPT</h2>
        </div>
        <form onSubmit={login}>
          <div className="mb-4">
            <label
              className="block text-gptWhite text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white hover:bg-blue-600 block py-2 px-4 mx-auto rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
            disabled={!email}
          >
            Sign In
          </button>
        </form>
        {/* <p className="mt-4 text-center text-sm text-gray-400">
          Not a member?{" "}
          <button
            onClick={() => router.push("signup")}
            className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </button>
        </p> */}
        <div className="bg-white px-4 py-3 rounded-md mt-8">
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-5 text-slate-500"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              alt="google logo"
              className="w-6 h-6"
            />
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
