import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { AppContextProvider } from "./context/AppContext";
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
  title: "CholooPujoo",
  description: "Experience the Durga Puja festival in Kolkata",
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
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
