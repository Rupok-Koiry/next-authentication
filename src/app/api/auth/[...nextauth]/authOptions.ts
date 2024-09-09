import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "@/utils/apiUsers";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "Password", password: "Password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) throw new Error("Missing credentials");

        const user = await findUserByEmail(email);
        if (!user) throw new Error("No user found with this email");

        const isValid = password === user.password;
        if (!isValid) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email;
      return session;
    },
  },
};
