'use server'

import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/model/users";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/lib/zod";
import { signIn } from "@/auth";

export const signUp = async (prevState: any, formData: FormData) => {
    await dbConnect();



    // 1. Convert FormData to an object
    const rawData = Object.fromEntries(formData.entries());
    // 2. Validate with Zod
    const validatedFields = SignUpSchema.safeParse(rawData);


    // 3. If validation fails, return the specific errors
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Sign Up.",
        };
    }

    const { firstName, lastName, email, password, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { message: "The Email Already Exists" };
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });
        // AUTO-LOGIN: This triggers the Credentials provider in your auth.ts
        await signIn("credentials", {
            email,
            password,
            redirect: false, // We handle redirection on the client side
        });

        return { success: true, message: "Account created successfully!" };
    } catch (error: any) {
        return { message: "Database Error: Failed to Create User." };
    }
}