// src/context/AuthProvider.js
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check for token in localStorage on initial load
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    // This useEffect now only removes the item from local storage
    // The fact that the token exists determines the state
    if (!isLoggedIn) {
      localStorage.removeItem("token");
    }
  }, [isLoggedIn]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}