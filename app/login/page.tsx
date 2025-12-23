'use client'

import { Feather } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // prevents page reload
        });
        console.log(result)


        if (result?.error) {
            toast.error("Invalid email or password");
            setLoading(false);
        } else {
            toast.success("Welcome back!");
            setTimeout(() => router.push("/"), 2000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-600">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <Link href="/" className="flex items-center gap-4 text-[#111418] justify-center mb-6">
                    <div className="size-8 text-primary">
                        <Feather className="text-green-800" />
                    </div>
                    <h2 className="text-[#111418]  text-xl font-bold leading-tight tracking-[-0.015em]">
                        HopeGive
                    </h2>
                </Link>
                <div className="text-2xl font-bold mb-6 text-center flex-col md:flex justify-center">

                    Login to your Account</div>



                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="email" type="email" placeholder="Email" required className="w-full border p-2 rounded" />
                    <input name="password" type="password" placeholder="Password" required className="w-full border p-2 rounded" />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    New to our cause? <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}