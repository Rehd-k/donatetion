import { Suspense } from 'react';
import Donate from './donate';

export default function DonatePage() {
  return (
    <Suspense fallback={<div>Loading donation form...</div>}>
      <Donate />
    </Suspense>
  );
}