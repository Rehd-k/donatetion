// auth.config.ts
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.role = (user as any).role;
        }
        return token;
    },
    async session({ session, token }) {
        if (token.role && session.user && token.sub) {
            session.user.role = token.role as string;
            session.user.id = token.sub;
        }
        return session;
    },
    // We can add the authorized callback here, or handle it in middleware wrapper
    authorized({ auth }) {
        const isLoggedIn = !!auth?.user;
        return isLoggedIn; 
    }
  },
  providers: [], // Keep this empty!
} satisfies NextAuthConfig;