'use client';


import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/currency"
import { useState } from "react";

// Client component for save toggle (re-render on save)
const CampaignsClient = ({ campaignsList, userFavorites, user }: { campaignsList: any, userFavorites: any, user: any }) => {
    const userInfo = user ? JSON.parse(user) : null;
    const campaigns = JSON.parse(campaignsList);
    console.log(campaigns)
    let favs = [];
    if (userFavorites.length > 1) {
        favs = JSON.parse(userFavorites)
    }
    const [favorites, setFavorites] = useState(favs.map((f: { _id: { toString: () => any; }; }) => f._id.toString()));

    const handleSave = async (campaignId: string) => {
        const isSaved = favorites.includes(campaignId);
        const res = await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ campaignId, action: isSaved ? 'remove' : 'add' }),
        });
        if (res.ok) {
            setFavorites(isSaved ? favorites.filter((id: string) => id !== campaignId) : [...favorites, campaignId]);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {campaigns.map((camp: any) => {
                const isSaved = favorites.includes(camp._id.toString());
                return (
                    <div key={camp._id} className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                        {(() => {
                            const ImageCarousel = ({ images = [], alt, category }: { images?: any[]; alt?: string; category?: string }) => {
                                const [index, setIndex] = useState(0);
                                const len = images?.length ?? 0;
                                const prev = (e: React.MouseEvent) => { e.stopPropagation(); if (len) setIndex(i => (i - 1 + len) % len); };
                                const next = (e: React.MouseEvent) => { e.stopPropagation(); if (len) setIndex(i => (i + 1) % len); };
                                return (
                                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1200 / 800' }}>
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="inline-flex items-center rounded-md bg-gray-100 text-gray-600 px-2 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-gray-500/10">
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

                            return <ImageCarousel images={camp.images ?? []} alt={camp.title} category={camp.category} />;
                        })()}
                        <div className="flex flex-col flex-1 p-5 gap-4">
                            <div>
                                <h3 className="text-[#111418]  text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                                    {camp.title}
                                </h3>
                                <p className="text-[#617589]  text-sm leading-normal line-clamp-2">
                                    {camp.description}
                                </p>
                            </div>
                            <div className="mt-auto flex flex-col gap-2">
                                <div className="w-full bg-gray-100  rounded-full h-2.5">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(camp.currentAmount / camp.targetAmount) * 100}%` }}></div>

                                </div>
                                <div className="flex justify-between items-center text-sm">

                                    <span className="font-bold text-[#111418] ">
                                        {formatCurrency(camp.currentAmount, userInfo ? userInfo.currency : null)}
                                        <span className="font-normal text-gray-500">{" "}raised</span>
                                    </span>
                                    <span className="text-gray-500">of {formatCurrency(camp.targetAmount, userInfo ? userInfo.currency : null)}</span>
                                </div>
                            </div>
                            {userInfo ? <div className="flex space-x-2 w-full justify-between">
                                <Button variant="primary">
                                    <a href={`/donate?campaign=${camp._id}`}>Donate Now</a>
                                </Button>
                                <Button variant="outline" onClick={() => handleSave(camp._id.toString())}>
                                    {isSaved ? 'Saved' : 'Save'}
                                </Button>
                            </div> : <></>}

                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CampaignsClient;