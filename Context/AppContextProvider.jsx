"use client";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  return (
    <AppContext.Provider value={{ isSideOpen, setIsSideOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
