"use client";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
  updateProfile,
} from "firebase/auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../../firebase";

export default function SigninConfirm() {
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          window.localStorage.removeItem("emailForSignIn");
          const details = getAdditionalUserInfo(result);

          // if (details.isNewUser) {

          // } else {
          await signIn("credentials", {
            user: JSON.stringify(result.user),
            redirect: true,
            callbackUrl: "/",
          });
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  text-center text-white">
            Checking code...
          </div>
        </div>
      </div>
    </>
  );
}
