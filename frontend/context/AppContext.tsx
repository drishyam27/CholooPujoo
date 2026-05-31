"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface AppContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  completedIds: string[];
  toggleCompleted: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Simple local storage persistence
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedIds");
    if (storedBookmarks) setBookmarkedIds(JSON.parse(storedBookmarks));

    const storedCompleted = localStorage.getItem("completedIds");
    if (storedCompleted) setCompletedIds(JSON.parse(storedCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem("completedIds", JSON.stringify(completedIds));
  }, [completedIds]);

  const login = () => signIn("google");
  const logout = () => signOut({ callbackUrl: "/login" });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        bookmarkedIds,
        toggleBookmark,
        completedIds,
        toggleCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
