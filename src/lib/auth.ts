import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    //   CredentialsProvider({
    //     name: "Credentials",
    //     credentials: {
    //       username: {
    //         label: "Username",
    //         type: "text",
    //         placeholder: "Enter your username here...",
    //       },
    //       password: {
    //         label: "Password",
    //         type: "password",
    //         placeholder: "Enter your password here...",
    //       },
    //       email: {
    //         label: "Email",
    //         type: "email",
    //         placeholder: "Enter your password here...",
    //       },
    //     },
    //     authorize(credentials) {
    //       const user = { id: "", email: "", password: "", name: "" };
    //       if (
    //         credentials?.email === user.email &&
    //         credentials.username === user.name &&
    //         credentials.password === user.password
    //       ) {
    //         return user;
    //       } else {
    //         return null;
    //       }
    //     },
    //   }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

export const getAuthSession = async () => await getServerSession(authOptions);
