'use client'; // Client component for state

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button'; // Reusable Button
import { BarChart3, Heart, Target, User, Settings, LogOut, Menu, Feather } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Donation website links: Customize as needed
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/donations', label: 'My Donations' },
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/profile', label: 'Profile' },
    { href: '/settings', label: 'Settings' },
    { href: '/logout', label: 'Logout' }, // Handle logout logic
  ];

  return (
    <div className="flex h-screen overflow-hidden text-gray-700">
      {/* Sidebar: Hidden on mobile, fixed on desktop */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-linear-to-b from-blue-50 to-blue-100 transform transition-transform duration-300 ease-in-out flex flex-col',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:z-auto'
        )}
      >
        <div className="px-6 py-3 border-b border-blue-700">
          <Link href="/" className="flex items-center gap-4 text-[#111418] ">
            <div className="size-8 text-primary">
              <Feather className="text-green-800" />
            </div>
            <h2 className="text-[#111418]  text-xl font-bold leading-tight tracking-[-0.015em]">
              HopeGive
            </h2>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navLinks.slice(0, -1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="text-lg">
                    {link.label === 'Dashboard' && <BarChart3 size={20} />}
                    {link.label === 'My Donations' && <Heart size={20} />}
                    {link.label === 'Campaigns' && <Target size={20} />}
                    {link.label === 'Profile' && <User size={20} />}
                    {link.label === 'Settings' && <Settings size={20} />}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <Button
            onClick={() =>
              signOut({
                callbackUrl: '/login', // where to redirect after logout
              })
            }
            className="flex w-full items-center gap-3 px-4 py-3 text-gray-50 rounded-lg hover:bg-red-500  hover:text-white transition-colors"

          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay: Close sidebar on click */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-gray-100 py-2 px-2 md:hidden">
          <Button variant="ghost" size="sm" className="md:hidden mb-4 flex" onClick={toggleSidebar}>
            <Menu size={20} className="mr-2" />
            Menu
          </Button>
        </div>
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}