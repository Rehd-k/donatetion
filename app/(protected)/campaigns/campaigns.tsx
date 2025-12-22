'use client';


import Button from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/currency";
import { DESIGN_TOKENS } from "@/lib/design-tokens";
import { useState } from "react";

// Client component for save toggle (re-render on save)
const CampaignsClient = ({ campaigns, userFavorites, user }: { campaigns: any[], userFavorites: any[], user: any }) => {
    const userInfo = JSON.parse(user);
    const [favorites, setFavorites] = useState(userFavorites.map(f => f._id.toString()));

    const handleSave = async (campaignId: string) => {
        const isSaved = favorites.includes(campaignId);
        const res = await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ campaignId, action: isSaved ? 'remove' : 'add' }),
        });
        if (res.ok) {
            setFavorites(isSaved ? favorites.filter(id => id !== campaignId) : [...favorites, campaignId]);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp: any) => {
                const isSaved = favorites.includes(camp._id.toString());
                return (
                    <Card key={camp._id} className={DESIGN_TOKENS.components.card}>
                        <CardHeader className="bg-primary-50">{camp.title}</CardHeader>
                        <CardBody>
                            <p className={DESIGN_TOKENS.typography.body + ' mb-2'}>{camp.description}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(camp.currentAmount / camp.targetAmount) * 100}%` }}></div>
                            </div>
                            <p className="text-sm font-medium text-primary-700 mb-4">
                                {formatCurrency(camp.currentAmount, userInfo.currency)} / {formatCurrency(camp.targetAmount, userInfo.currency)}
                            </p>
                            <div className="flex space-x-2">
                                <Button variant="primary">
                                    <a href={`/donate?campaign=${camp._id}`}>Donate Now</a>
                                </Button>
                                <Button variant="outline" onClick={() => handleSave(camp._id.toString())}>
                                    {isSaved ? 'Saved' : 'Save'}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
};

export default CampaignsClient;