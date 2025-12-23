import { z } from "zod";

export const SignUpSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["donor", "volunteer", "user", "admin"]).default("user"),
});

// This type helps TypeScript understand the schema
export type SignUpInput = z.infer<typeof SignUpSchema>;