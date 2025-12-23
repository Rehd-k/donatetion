'use client';

import { useState, useEffect, JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Upload, Copy, Check, DollarSign, CreditCard, QrCode, Wallet } from 'lucide-react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import { toast } from 'react-hot-toast'; // or use your preferred toast library
import Button from '@/components/ui/Button';

export default function UploadProof() {
    const searchParams = useSearchParams();
    const donationId = searchParams.get('donation');
    const method = searchParams.get('method') || 'bank'; // default to bank
    const amount = searchParams.get('amount') || '0';

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    // Sample payment details (replace with your actual ones!)
    const paymentDetails: Record<string, { title: string; icon: JSX.Element; details: JSX.Element }> = {
        paypal: {
            title: 'PayPal',
            icon: <img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_266x142.png" alt="PayPal" className="h-10" />,
            details: (
                <div className="space-y-3">
                    <p className="text-lg font-medium">Send to:</p>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <CreditCard className="text-blue-600" size={24} />
                        <span className="font-mono text-gray-800">yourpaypal@example.com</span>
                        <button
                            onClick={() => copyToClipboard('yourpaypal@example.com', 'paypal')}
                            className="ml-auto text-primary-600 hover:text-primary-800"
                        >
                            {copied === 'paypal' ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">Include donation ID: {donationId} in the note</p>
                </div>
            ),
        },
        cashapp: {
            title: 'Cash App',
            icon: <img src="https://download.logo.wine/logo/Cash_App/Cash_App-Logo.wine.png" alt="Cash App" className="h-12" />,
            details: (
                <div className="space-y-3">
                    <p className="text-lg font-medium">Send to:</p>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <DollarSign className="text-green-600" size={24} />
                        <span className="font-mono text-gray-800">$YourCashAppTag</span>
                        <button
                            onClick={() => copyToClipboard('$YourCashAppTag', 'cashapp')}
                            className="ml-auto text-primary-600 hover:text-primary-800"
                        >
                            {copied === 'cashapp' ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">Note: {amount} donation for ID {donationId}</p>
                </div>
            ),
        },
        crypto: {
            title: 'Crypto (USDT)',
            icon: <Wallet className="text-teal-600" size={40} />,
            details: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="font-medium">TRC20 (Tron)</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="font-mono text-sm break-all text-gray-800">TYourTRC20WalletAddressHere</span>
                                <button
                                    onClick={() => copyToClipboard('TYourTRC20WalletAddressHere', 'trc20')}
                                    className="text-primary-600 hover:text-primary-800"
                                >
                                    {copied === 'trc20' ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="font-medium">ERC20 (Ethereum)</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="font-mono text-sm break-all text-gray-800">0xYourERC20WalletAddressHere</span>
                                <button
                                    onClick={() => copyToClipboard('0xYourERC20WalletAddressHere', 'erc20')}
                                    className="text-primary-600 hover:text-primary-800"
                                >
                                    {copied === 'erc20' ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">Send exactly {amount} USDT • Include donation ID: {donationId}</p>
                </div>
            ),
        },
        bank: {
            title: 'Bank Transfer',
            icon: <CreditCard className="text-purple-600" size={40} />,
            details: (
                <div className="space-y-3">
                    <p className="text-lg font-medium">Bank Details:</p>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                        <p><strong>Account Name:</strong> Your Name</p>
                        <p><strong>Bank:</strong> Your Bank</p>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>Routing/Swift:</strong> ABC123XYZ</p>
                    </div>
                    <p className="text-sm text-gray-600">Upload proof after transfer • Reference: Donation {donationId}</p>
                </div>
            ),
        },
    };

    const selected = paymentDetails[method] || paymentDetails.bank;

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(null), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file || !donationId) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('proof', file);
        formData.append('donationId', donationId);

        const res = await fetch('/upload-proof/api', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            toast.success('Proof uploaded successfully!');
            window.location.href = '/donations';
        } else {
            toast.error('Upload failed. Please try again.');
        }
        setUploading(false);
    };

    return (
        <div className={`${DESIGN_TOKENS.spacing.margin} max-w-4xl mx-auto`}>
            <h1 className={`${DESIGN_TOKENS.typography.heading} flex items-center mb-8`}>
                <Upload className="mr-3 text-primary-600" size={32} /> Upload Payment Proof
            </h1>

            <Card className="overflow-hidden shadow-xl border-none">
                {/* Payment Instructions */}
                <div className="bg-linear-to-r from-primary-50 to-primary-100 p-8">
                    <div className="flex items-center gap-4 mb-6">
                        {selected.icon}
                        <h2 className="text-2xl font-bold text-gray-800">{selected.title}</h2>
                    </div>
                    <div className="text-lg font-medium text-gray-700 mb-2">
                        Amount: <span className="text-primary-700 font-bold">${amount}</span>
                    </div>
                    {selected.details}
                </div>

                {/* Upload Area */}
                <CardBody className="p-8 space-y-6">
                    <div
                        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${preview ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                            }`}
                    >
                        {preview ? (
                            <div className="space-y-4">
                                <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                                <p className="text-gray-600">Screenshot ready to upload</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto text-gray-400" size={64} />
                                <p className="mt-4 text-lg font-medium text-gray-700">Drop your screenshot here or click to browse</p>
                                <p className="text-sm text-gray-500 mt-2">PNG, JPG, or PDF (max 10MB)</p>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer size-32"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-6">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleUpload}
                            loading={uploading}
                            disabled={!file || uploading}
                            className="px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
                        >
                            Submit Proof
                        </Button>
                        <p className="mt-4 text-sm text-gray-500">
                            All uploads are encrypted and securely stored.
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}