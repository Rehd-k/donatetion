'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { DollarSign } from 'lucide-react';
import { DESIGN_TOKENS } from '@/lib/design-tokens';
import { formatCurrency } from '@/lib/currency';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { useSession } from 'next-auth/react';

export default function Donate() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const campaignId = searchParams.get('campaign');
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState('stripe'); // 'stripe', 'paypal', 'bank'
  const [currency, setCurrency] = useState('USD');
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    // Fetch user currency and campaign details
    const fetchData = async () => {
      const res = await fetch(`/api/user`);
      const user = await res.json();
      setCurrency(user.preferredCurrency || 'USD');

      if (campaignId) {
        const campRes = await fetch(`/campaigns/api/${campaignId}`);
        setCampaign(await campRes.json());
      }
    };
    fetchData();
  }, [campaignId]);

  const handleDonate = async () => {
    const res = await fetch('/donate/api/pending', {
      method: 'POST',
      body: JSON.stringify({ amount, currency, user: session?.user?.id, campaign: campaignId, status: 'pending' }),
    });
    /**
     * 
     *    if (method === 'stripe') {
     const res = await fetch('/api/stripe/checkout', {
       method: 'POST',
       body: JSON.stringify({ amount, currency, campaignId }),
     });
     const { id } = await res.json();
   //   const stripe = await stripePromise;
   //   await stripe?.redirectToCheckout({ sessionId: id });
   } else if (method === 'bank') {
    
     // Redirect to upload proof with pending donation
     const res = await fetch('/admin/donations/api', {
       method: 'POST',
       body: JSON.stringify({ amount, currency, campaign : campaignId, status: 'pending' }),
     });
     const { donationId } = await res.json();
     window.location.href = `/upload-proof?donation=${donationId}`;
   }
     */

  };

  return (
    <div className={DESIGN_TOKENS.spacing.margin}>
      <h1 className={DESIGN_TOKENS.typography.heading + ' flex items-center'}>
        <DollarSign className="mr-2 text-primary-500" /> Donate to {campaign?.title || 'General Fund'}
      </h1>

      <Card>
        <CardHeader>Select Amount and Method</CardHeader>
        <CardBody className="space-y-6">
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <p className="text-sm text-gray-600">In {currency}: {formatCurrency(amount, currency)}</p>

          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="method" value="stripe" checked={method === 'stripe'} onChange={(e) => setMethod(e.target.value)} className="mr-2" />
              Stripe (Credit Card)
            </label>
            <label className="flex items-center">
              <input type="radio" name="method" value="paypal" checked={method === 'paypal'} onChange={(e) => setMethod(e.target.value)} className="mr-2" />
              PayPal
            </label>
            <label className="flex items-center">
              <input type="radio" name="method" value="bank" checked={method === 'bank'} onChange={(e) => setMethod(e.target.value)} className="mr-2" />
              Bank Transfer (Upload Proof After)
            </label>
          </div>

          <Button variant="primary" onClick={handleDonate}>Proceed to Payment</Button>
        </CardBody>
      </Card>
    </div>
  );
}