'use server';
import { signOut } from '@/auth';

export default async function Logout() {
    'use server';
    await signOut({ redirectTo: '/login' });
}
