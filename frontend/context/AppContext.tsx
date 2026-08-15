"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { supabase } from "@/backend/supabase";
import { User } from "@supabase/supabase-js";

interface AppContextType {
  isLoggedIn: boolean;
  userEmail?: string | null;
  userName?: string | null;
  userImage?: string | null;
  login: () => void;
  loginGuest: () => void;
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
  const { data: nextAuthSession, status } = useSession();
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  // Listen to Supabase native auth state changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setSupabaseUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const realEmail = supabaseUser?.email || nextAuthSession?.user?.email;
  const userEmail = realEmail || (isGuest ? "mock-tester@choloopujoo.com" : null);
  const userName = supabaseUser?.user_metadata?.full_name || nextAuthSession?.user?.name || (isGuest ? "Guest Explorer" : null);
  const userImage = supabaseUser?.user_metadata?.avatar_url || nextAuthSession?.user?.image || "/images/avatar-girl.png";

  // Check guest state in localStorage
  useEffect(() => {
    const guestState = localStorage.getItem("guestSession");
    if (guestState === "true") {
      setIsGuest(true);
    }
  }, []);

  const isLoggedIn = status === "authenticated" || Boolean(realEmail) || isGuest;

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Load user's personal visited pandals directly from Supabase on login
  useEffect(() => {
    async function loadUserData() {
      if (!userEmail) return;

      try {
        const { data: user } = await supabase
          .from("users")
          .select("visited_pandals")
          .eq("email", userEmail)
          .single();

        if (user && Array.isArray(user.visited_pandals)) {
          setCompletedIds(user.visited_pandals);
        }
      } catch (error) {
        console.error("Error fetching user data from Supabase:", error);
      }
    }

    if (isLoggedIn) {
      loadUserData();
    }
  }, [userEmail, isLoggedIn]);

  // Local storage backup persistence
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedIds");
    if (storedBookmarks) setBookmarkedIds(JSON.parse(storedBookmarks));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem("completedIds", JSON.stringify(completedIds));
  }, [completedIds]);

  const login = () => {
    localStorage.removeItem("guestSession");
    setIsGuest(false);
    signIn("google", { callbackUrl: "/" });
  };

  const loginGuest = () => {
    localStorage.setItem("guestSession", "true");
    setIsGuest(true);
  };

  const logout = async () => {
    localStorage.removeItem("guestSession");
    setIsGuest(false);
    await supabase.auth.signOut();
    signOut({ callbackUrl: "/login" });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const toggleCompleted = async (id: string) => {
    const updated = completedIds.includes(id)
      ? completedIds.filter((cId) => cId !== id)
      : [...completedIds, id];

    setCompletedIds(updated);

    try {
      await fetch("/api/user/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pandalId: id }),
      });
    } catch (error) {
      console.error("Failed to log visit in database:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        userName,
        userImage,
        login,
        loginGuest,
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
