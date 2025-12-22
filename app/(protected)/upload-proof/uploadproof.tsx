'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Upload } from 'lucide-react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';

export default function UploadProof() {
    const searchParams = useSearchParams();
    const donationId = searchParams.get('donation');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('proof', file);
        formData.append('donationId', donationId!);

        const res = await fetch('/api/donations/proof', {
            method: 'POST',
            body: formData,
        });
        if (res.ok) {
            // Redirect or show success
            window.location.href = '/donations';
        }
        setUploading(false);
    };

    return (
        <div className={DESIGN_TOKENS.spacing.margin}>
            <h1 className={DESIGN_TOKENS.typography.heading + ' flex items-center'}>
                <Upload className="mr-2 text-primary-500" /> Upload Payment Proof
            </h1>

            <Card>
                <CardHeader>Upload Screenshot</CardHeader>
                <CardBody className="space-y-4">
                    <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <Button variant="primary" onClick={handleUpload} loading={uploading}>Submit Proof</Button>
                </CardBody>
            </Card>
        </div>
    );
}