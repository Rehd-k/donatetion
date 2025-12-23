import { Suspense } from 'react';
import Donate from './donate';
import { auth } from '@/auth';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default async function DonatePage() {
  const session = await auth();
  const { redirect } = await import('next/navigation');

  if (!session?.user) {
    redirect('/login');
  } else {

    if (session.user?.role === 'admin' || session.user?.role === 'admin') {
      redirect('/admin');
    }
  }
  return (
    <Suspense fallback={<div>Loading donation form...</div>}>
      <header className="justify-between items-end mb-6 p-2 bg-blue-50 md:flex hidden fixed w-full ml-auto  z-999">

        <Link href="/donate"><Button className="mt-4 md:mt-0">Donate Now</Button></Link>

      </header>
      <div className="md:py-8"></div>
      <Donate />
    </Suspense>
  );
}