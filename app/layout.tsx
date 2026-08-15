import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { AppContextProvider } from "@/frontend/context/AppContext";
import NextAuthProvider from "@/frontend/context/NextAuthProvider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CholooPujoo - Kolkata's Ultimate Durga Puja Companion",
  description: "Experience the spirit of Durga Puja in Kolkata with real-time crowd updates, DDI AI chatbot navigation, and live Maha Leaderboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <NextAuthProvider>
          <AppContextProvider>
            {children}
            <Analytics />
          </AppContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
