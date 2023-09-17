
'use client';
import { AppContext } from "../Context/AppContextProvider";
import React, { useContext } from "react";

function Navbar() {
  const {setIsSideOpen} = useContext(AppContext);
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
            onClick={()=> setIsSideOpen(prev => !prev)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
      </div>
      <h3 className="text-sm text-gptWhite grow text-center">New Chat</h3>
      <div>
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
