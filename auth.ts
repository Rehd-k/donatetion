import bcrypt from "bcryptjs";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { User } from "./lib/model/users";
import dbConnect from "./lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                // 1. Validate the inputs
                const parsedCredentials = z
                    .object({ email: z.email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                // 2. Connect to DB and find user
                await dbConnect();
                const user = await User.findOne({ email });
                if (!user || !user.password) return null;

                // 3. Check password
                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) {
                    return {
                        id: user._id.toString(),
                        name: user.firstName,
                        email: user.email,
                        role: user.role, // Pass role to the session
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role; // Attach role to the JWT
            }
            return token;
        },
        async session({ session, token }) {
            if (token.role && session.user && token.sub) {
                session.user.role = token.role as string; // Attach role to the Session
                session.user!.id = token.sub; // Attach user ID to the Session
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    // debug: process.env.NODE_ENV === 'development',
})  