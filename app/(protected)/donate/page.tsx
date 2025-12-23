import { Suspense } from 'react';
import Donate from './donate';
import { auth } from '@/auth';

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
      <Donate />
    </Suspense>
  );
}