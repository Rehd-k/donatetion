'use client'

import { useActionState, useEffect } from "react";
import { signUp } from "@/app/actions/auth/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Feather } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SignUpPage() {
    // state will hold the return value from your signUp action
    const [state, formAction, isPending] = useActionState(signUp, null);
    const router = useRouter();

    const { data: session, status } = useSession();

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            // Redirect to dashboard or home after a short delay
            setTimeout(() => router.push("/"), 2000);
        }
        if (state?.message && !state.success) {
            toast.error(state.message);
        }

        if (status === 'loading') return;

        if (!session) {

            return;
        }

        const role = (session as any)?.user?.role;
        if (role === 'user') {
            if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/dashboard')) {
                window.location.href = '/dashboard';
            }
        }

        if (role === 'admin') {
            if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
                window.location.href = '/admin';
            }
        }
    }, [state, router, session, status]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-gray-700">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <Link href="/" className="flex items-center gap-4 text-[#111418] justify-center mb-6">
                    <div className="size-8 text-primary">
                        <Feather className="text-green-800" />
                    </div>
                    <h2 className="text-[#111418]  text-xl font-bold leading-tight tracking-[-0.015em]">
                        HopeFundr
                    </h2>
                </Link>
                <h1 className="text-3xl font-bold text-center text-emerald-700 mb-2">Join Our Cause</h1>
                <p className="text-center text-gray-600 mb-8">Create an account to start donating.</p>

                <form action={formAction} className="space-y-4">
                    <div>
                        <input name="firstName" placeholder="First Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        {state?.errors?.firstName && <p className="text-red-500 text-xs mt-1">{state.errors.firstName}</p>}
                    </div>

                    <div>
                        <input name="lastName" placeholder="Last Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        {state?.errors?.lastName && <p className="text-red-500 text-xs mt-1">{state.errors.lastName}</p>}
                    </div>

                    <div>
                        <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        {state?.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>}
                    </div>

                    <div>
                        <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        {state?.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>}
                    </div>

                    <button
                        disabled={isPending}
                        className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition duration-200 disabled:bg-gray-400"
                    >
                        {isPending ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                {state?.message && (
                    <div className={`mt-4 p-3 rounded text-center ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {state.message}
                    </div>
                )}
                <p className="mt-4 text-center text-sm">
                    Already a Giver? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </div>


        </div>
    );
}