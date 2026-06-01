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
  useSession();
  const isLoggedIn = true; // Bypassed Google Login for preview

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Simple local storage persistence
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedIds");
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const toggleCompleted = async (id: string) => {
    const isCurrentlyCompleted = completedIds.includes(id);
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );

    if (!isCurrentlyCompleted) {
      try {
        await fetch("/api/user/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pandalId: id }),
        });
      } catch (error) {
        console.error("Failed to log visit in database:", error);
      }
    }
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
