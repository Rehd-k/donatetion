"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Button from "./ui/Button";

export default function LogoutButton() {
    return <Button
        onClick={() =>
            signOut({
                callbackUrl: '/', // where to redirect after logout
            })
        }
        className="flex p-2 items-center gap-3 px-4 py-3 text-gray-50 rounded-lg hover:bg-red-500  hover:text-white transition-colors"

    >
        <LogOut size={20} />
        Logout
    </Button>
}
