// ./app/(admin)/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  HandCoins,
  Megaphone,
  LogOut,
  Menu,
  X,
  Feather
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { signOut, useSession } from 'next-auth/react';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/admin/donations', label: 'Donations', icon: HandCoins },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
      return;
    }

    const role = (session as any)?.user?.role;
    if (role === 'user') {
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/dashboard')) {
        window.location.href = '/dashboard';
      }
    }
  }, [session, status]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-700">
      {/* Sidebar - Mobile & Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static md:z-auto"
      )}>
        <div className="flex items-center justify-between px-3 pt-4 pb-3 border-b">

          <Link href="/" className="flex items-center gap-4 text-[#111418] ">
            <div className="size-8 text-primary">
              <Feather className="text-green-800" />
            </div>
            <h2 className="text-[#111418]  text-xl font-bold leading-tight tracking-[-0.015em]">
              HopeGive
            </h2>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary-100 text-primary-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-8 border-t">
            <Button variant="outline" className="w-full justify-start" onClick={() =>
              signOut({
                callbackUrl: '/login', // where to redirect after logout
              })
            }>
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                Logout
              </div>
            </Button>
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {adminNavLinks.find(l => l.href === pathname)?.label || 'Admin'}
          </h1>
          <div className="text-sm text-gray-500">Donation Platform Admin</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}