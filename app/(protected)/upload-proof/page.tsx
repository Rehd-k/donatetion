import { Suspense } from 'react';
import UploadProof from './uploadproof';

export default function UploadProofPage() {
    return (
        <Suspense fallback={<div>Loading donation form...</div>}>
            <UploadProof />
        </Suspense>
    );
}