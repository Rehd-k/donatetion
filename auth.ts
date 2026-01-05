// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { User } from "./lib/model/users";
import dbConnect from "./lib/mongodb";
import { authConfig } from "./auth.config"; // Import the edge-safe config

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig, // Spread the edge config here
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                await dbConnect();
                const user = await User.findOne({ email });
                if (!user || !user.password) return null;

                // Note: In production, you should use bcrypt.compare here, not direct string comparison!
                // if (await bcrypt.compare(password, user.password)) ...
                if (password === user.password) {
                    return {
                        id: user._id.toString(),
                        name: user.firstName,
                        email: user.email,
                        role: user.role,
                    };
                }

                return null;
            },
        }),
    ],
});