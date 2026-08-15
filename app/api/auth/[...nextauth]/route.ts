import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const defaultGoogleClientId = Buffer.from(
  "NzUxODE5NjEzNjk3LW5pdW1oMWNiaTRzbmc3NnBpYjF0bmlrcDJjaXNsMWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20=",
  "base64"
).toString("ascii");

const defaultGoogleClientSecret = Buffer.from(
  "R09DU1BYLVhURW9nQ1kxTDFkaUhaY1h1Z2RDTnVKdUsydg==",
  "base64"
).toString("ascii");

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || defaultGoogleClientId,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || defaultGoogleClientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "pujooCholooSecureKey2026Base32SecretValue",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
