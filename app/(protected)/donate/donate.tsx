'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
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

  const ImageCarousel = ({ images = [], alt, category }: { images?: any[]; alt?: string; category?: string }) => {
    const [index, setIndex] = useState(0);
    const len = images?.length ?? 0;
    const prev = (e: React.MouseEvent) => { e.stopPropagation(); if (len) setIndex(i => (i - 1 + len) % len); };
    const next = (e: React.MouseEvent) => { e.stopPropagation(); if (len) setIndex(i => (i + 1) % len); };
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1200 / 800' }}>
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-gray-500/10">
            {category}
          </span>
        </div>

        {len > 0 ? (
          <>
            <div
              className="bg-center bg-no-repeat bg-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              role="img"
              aria-label={alt}
              style={{ backgroundImage: `url("${images[index].url}")` }}
            />

            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-medium">No image</div>
              <div className="text-sm text-gray-500">Placeholder (1200 x 800)</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    // Fetch user currency and campaign details
    const fetchData = async () => {
      const res = await fetch(`/api/user/dashboard`);
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
    const donationId = await res.json();
    window.location.href = `/upload-proof?donation=${donationId._id}&method=${method}&amount=${amount}`;
  };

  return (
    <div className={DESIGN_TOKENS.spacing.margin}>
      {/* <h1 className={DESIGN_TOKENS.typography.heading + ' flex items-center'}>
        <DollarSign className="mr-2 text-primary-500" /> Donate to {campaign?.title || 'General Fund'}
      </h1> */}

      <Card>

        <CardBody className="space-y-8">
          {/* Progress Summary */}
          <div className="text-center space-y-2">

            <p className="text-2xl font-bold">
              {campaign?.title || 'General Fund'}
            </p>

          </div>
          <div className="grid md:grid-cols-5 grid-cols-1 md:gap-6">
            {/* Preset Amount Buttons with Impact */}
            <div className="col-span-3">
              <div className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                <ImageCarousel images={campaign ? campaign.images : []} alt={campaign ? campaign.title : ''} category={campaign ? campaign.category : ''} />
              </div>


              {/* Custom Amount Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    Donation Amount
                  </label>
                  <Input
                    type="number"
                    min={50}
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    placeholder="Enter your amount"
                    className="text-lg"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    In {currency}: <span className="font-semibold">{formatCurrency(amount, currency)}</span>
                  </p>
                </div>
              </div>

              {/* Payment Methods - Modern Card Style */}
              <div className="mt-8">
                <p className="text-center text-xl font-semibold text-gray-800 mb-6">
                  Choose Payment Method
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {/* PayPal */}
                  <label
                    className={`relative flex flex-col items-center justify-center p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${method === 'paypal'
                      ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                      }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value="paypal"
                      checked={method === 'paypal'}
                      onChange={(e) => setMethod(e.target.value)}
                      className="absolute opacity-0"
                    />
                    <img
                      src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_266x142.png"
                      alt="PayPal"
                      className="h-12 mb-3"
                    />
                    <span className="text-lg font-medium text-gray-800">PayPal</span>
                    <span className="text-sm text-gray-600 mt-1">Cards, Bank & More</span>
                  </label>

                  {/* CashApp */}
                  <label
                    className={`relative flex flex-col items-center justify-center p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${method === 'cashapp'
                      ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                      : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                      }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value="cashapp"
                      checked={method === 'cashapp'}
                      onChange={(e) => setMethod(e.target.value)}
                      className="absolute opacity-0"
                    />
                    <img
                      src="https://download.logo.wine/logo/Cash_App/Cash_App-Logo.wine.png"
                      alt="Cash App"
                      className="h-16 mb-3"
                    />
                    <span className="text-lg font-medium text-gray-800">Cash App</span>
                    <span className="text-sm text-gray-600 mt-1">Fast & Easy</span>
                  </label>

                  {/* Crypto - USDT */}
                  <label
                    className={`relative flex flex-col items-center justify-center p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${method === 'crypto'
                      ? 'border-teal-600 bg-teal-50 shadow-lg scale-105'
                      : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                      }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value="crypto"
                      checked={method === 'crypto'}
                      onChange={(e) => setMethod(e.target.value)}
                      className="absolute opacity-0"
                    />
                    <img
                      src="https://www.shutterstock.com/image-vector/usdt-tether-icon-sign-payment-260nw-2080319674.jpg"
                      alt="USDT Crypto"
                      className="h-16 mb-3 rounded-full bg-white p-2"
                    />
                    <span className="text-lg font-medium text-gray-800">Crypto (USDT)</span>
                    <span className="text-sm text-gray-600 mt-1">Tether on TRC20/ERC20</span>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`relative flex flex-col items-center justify-center p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 col-span-1 md:col-span-2 lg:col-span-3 ${method === 'bank'
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                      }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value="bank"
                      checked={method === 'bank'}
                      onChange={(e) => setMethod(e.target.value)}
                      className="absolute opacity-0"
                    />
                    <img
                      src="https://as1.ftcdn.net/jpg/03/44/82/88/1000_F_344828830_i4p1YJKfiCksBb5XwUDmVqp3aoIxF0Xo.jpg"
                      alt="Bank Transfer"
                      className="h-14 mb-3"
                    />
                    <span className="text-lg font-medium text-gray-800">Bank Transfer</span>
                    <span className="text-sm text-gray-600 mt-1">Upload proof after payment</span>
                  </label>
                </div>
              </div>

              {/* Proceed Button */}
              <div className="mt-10 text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDonate}
                  disabled={!amount || amount <= 0 || !method}
                  className="px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
                >
                  Proceed to Payment
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  Secure • Fast • Multiple Options Available
                </p>
              </div>


            </div>
            <div className="col-span-2">
              {campaign ? <div className="mt-5 flex flex-col gap-2 bg-gray-200 rounded py-10 px-4 text-gray-50 ">
                <div className="w-full bg-gray-100  rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(campaign.currentAmount / campaign.targetAmount) * 100}%` }}></div>

                </div>
                <div className="flex justify-between items-center text-sm">

                  <span className="font-bold text-[#111418] ">
                    {formatCurrency(campaign.currentAmount, currency)}
                    <span className="font-normal text-gray-500">{" "}raised</span>
                  </span>
                  <span className="text-gray-500">of {formatCurrency(campaign.targetAmount, currency)}</span>
                </div>
              </div> : <></>}

              <p className="text-lg font-semibold text-center py-2">Suggested donation amounts:</p>
              <div className="space-y-4 grid grid-cols-1 gap-4">

                {[
                  // { value: 10, desc: "Help cover basic upload processing for initial files." },
                  // { value: 25, desc: "Support storage and organization for a batch of uploads." },
                  { value: 50, desc: "Fund enhanced features for multiple user uploads." },
                  { value: 100, desc: "Enable faster processing and security for more files." },
                  { value: 250, desc: "Contribute to platform improvements for larger uploads." },
                  { value: 500, desc: "Support a major update or new upload feature." },
                  { value: 1000, desc: "Help reach a milestone in platform development." },
                  { value: 5000, desc: "Fund a significant portion of the project goal." },
                ].map((option) => (

                  <button
                    key={option.value}
                    onClick={() => setAmount(option.value)}
                    className={`w-full text-left p-4 border rounded-lg transition ${amount === option.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-bold">${option.value}</span>
                        <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                      </div>
                      <span className="text-primary-500 text-2xl">›</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>



          <p className="text-sm text-gray-500 text-center">
            Donating is safe and secure with multiple payment options.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}