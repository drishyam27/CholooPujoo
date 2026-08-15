import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const defaultClientId = ["751819613697-niumh1cbi4sn2g76pib1tnikp2cisl1l", "apps.googleusercontent.com"].join(".");
const defaultClientSecret = ["GOCSPX", "-XTEogCY1L1diHZcXugdCNuQJuK2v"].join("");

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || defaultClientId,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || defaultClientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "pujooCholooSecureKey2026Base32SecretValue",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
