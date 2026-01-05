'use client'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CampaignsClient from "../(protected)/campaigns/campaigns";



type CampaignType = {
    _id: string;
    title: string;
    description: string;
    currentAmount: number;
    active: boolean;
    creator: { _id: string; name: string; email: string };
    createdAt: string;
    category: string;
    targetAmount: number;
    images: [];
    tags: [];
};

const ViewDonations = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState<CampaignType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const fetchCampaigns = async () => {
            try {
                const res = await fetch(`/admin/campaigns/api?category=${selectedCategory}`);
                if (res.ok) {
                    const data = await res.json();
                    setCampaigns(data.campaigns);
                    setFilteredCampaigns(data.campaigns);
                } else {
                    toast.error('Failed to load campaigns');
                }
                setCampaigns([]);
                setFilteredCampaigns([]);
            } catch {
                toast.error('Error loading campaigns');
            }
        };
        fetchCampaigns();
    }, [selectedCategory]);


    // Search filter
    useEffect(() => {
        if (searchTerm) {
            const filtered = campaigns.filter((c) =>
                c.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCampaigns(filtered);
        } else {
            setFilteredCampaigns(campaigns);
        }
    }, [searchTerm, campaigns]);

    const handleChangeCategory = (category: string) => {
        setSelectedCategory(category);
    }
    return <main className="grow">
        <div className="layout-container flex flex-col items-center">
            {/* Page Heading & Search */}
            <div className="w-full max-w-300 px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div className="flex flex-col gap-3 max-w-2xl">
                        <h1 className="text-[#111418]  text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                            Make an Impact
                        </h1>
                        <p className="text-[#617589]  text-lg font-normal leading-relaxed">
                            Browse our active campaigns and find a cause you care about. Every
                            contribution, big or small, brings us closer to a better world.
                        </p>
                    </div>
                    {/* Search Bar */}
                    <div className="w-full md:w-auto md:min-w-100">
                        <label className="flex flex-col h-12 w-full shadow-sm">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-gray-200  bg-white ">
                                <div className="text-[#617589]  flex items-center justify-center pl-4 pr-2">
                                    <span className="material-symbols-outlined text-[24px]">
                                        search
                                    </span>
                                </div>
                                <input
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#111418]  focus:outline-0 bg-transparent placeholder:text-[#9aa2ac] px-2 text-base font-normal leading-normal"
                                    placeholder="Search causes, charities..."
                                />
                            </div>
                        </label>
                    </div>
                </div>
                {/* Filters & Sorting */}
                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 items-center justify-between bg-white  p-4 rounded-xl shadow-sm border border-gray-100  mb-8 w-full sticky top-0 z-10">
                    {/* Category Chips */}
                    <div className="flex gap-2 lg:col-span-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
                        <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'all' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('all')}>
                            <p className="text-sm font-medium leading-normal">All</p>
                        </button>
                        <button
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'medical' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('medical')}>
                            <p className="text-sm font-medium leading-normal">
                                Medical
                            </p>
                        </button>
                        <button
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'education' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('education')}>
                            <p className="text-sm font-medium leading-normal">
                                Education
                            </p>
                        </button>
                        <button
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'environment' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('environment')}>
                            <p className="text-sm font-medium leading-normal">
                                Environment
                            </p>
                        </button>
                        <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'emergency' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('emergency')}   >
                            <p className="text-sm font-medium leading-normal">
                                Emergency
                            </p>
                        </button>



                        <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'food security' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('food security')}>
                            <p className="text-sm font-medium leading-normal">
                                Food Securit
                            </p>
                        </button>
                        <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'physical health' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('physical health')}>
                            <p className="text-sm font-medium leading-normal">
                                Physical Health
                            </p>
                        </button>
                        <button
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'animals' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('animals')}>
                            <p className="text-sm font-medium leading-normal">
                                Animals
                            </p>
                        </button>
                        <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full ${selectedCategory === 'clean water' ? 'bg-[#111418] text-white' : 'bg-[#f0f2f4] text-gray-600'} px-4 transition-all shadow-sm`} onClick={() => handleChangeCategory('clean water')}>

                            <p className="  text-sm font-medium leading-normal">
                                Clean Water
                            </p>
                        </button>
                    </div>
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 border-gray-100 pt-3 lg:pt-0">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                            Sort by:
                        </span>
                        <div className="relative group">
                            <button className="flex h-9 items-center gap-2 px-3 rounded-lg border border-gray-200  hover:border-primary bg-white  text-[#111418]  transition-all">
                                <span className="text-sm font-medium">Most Popular</span>
                                <span className="material-symbols-outlined text-[20px]">
                                    expand_more
                                </span>
                            </button>
                            {/* Dropdown content (hidden by default, visualized for structure) */}
                        </div>
                    </div>
                </div>
                {/* Campaigns Grid */}
                <CampaignsClient campaignsList={JSON.stringify(campaigns)} userFavorites={JSON.stringify([])} user={null} />

                {/* Pagination / Load More */}
                <div className="flex justify-center mb-16">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200  hover:bg-gray-50 text-[#111418]  transition-colors">
                        <span className="text-sm font-bold">Load More Campaigns</span>
                        <span className="material-symbols-outlined text-[20px]">
                            expand_more
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </main>
}

export default ViewDonations;