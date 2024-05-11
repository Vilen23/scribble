import CredentialsProvider from "next-auth/providers/credentials";
import bycrpt from "bcrypt";
import prisma from "./db";
import axios from "axios";
export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        console.log(credentials);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`,
          {
            credentials,
          }
        );
        if (response.status === 200) {
          return response.data.user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }: any) {
      session.user.id = token.id;
      return session;
    },
  },
};
