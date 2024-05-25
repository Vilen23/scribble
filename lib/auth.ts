import CredentialsProvider from "next-auth/providers/credentials";
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
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`,
            { credentials }
          );
          if (response.status === 200) {
            return response.data.user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }:any) {
      session.user.id = token.id;
      return session;
    },
  },
};
