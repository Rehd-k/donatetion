import { Feather } from "lucide-react";
import Link from "next/link";

export default function CampaignsPage() {
    return <>

        {/* Header / Navigation */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] bg-white  px-4 py-3 md:px-10 lg:px-40 shadow-sm">
            <Link href="/" className="flex items-center gap-4 text-[#111418] ">
                <div className="size-8 text-primary">
                    <Feather className="text-green-800" />
                </div>
                <h2 className="text-[#111418]  text-xl font-bold leading-tight tracking-[-0.015em]">
                    HopeGive
                </h2>
            </Link>
            <div className="flex flex-1 justify-end gap-8">
                <nav className="hidden lg:flex items-center gap-9">
                    <Link
                        className="text-[#111418]  text-sm font-medium hover:text-primary transition-colors"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-[#111418]  text-sm font-medium hover:text-primary transition-colors"
                        href="donatetocampaigns"
                    >
                        Causes
                    </Link>

                </nav>
                <Link href="/dashboard" className="flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-blue-700 hover:bg-primary-dark transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-md">
                    <span className="truncate">Donate Now</span>
                </Link>
            </div>
        </header>
        {/* Main Content */}
        <main className="grow">
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
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white  p-4 rounded-xl shadow-sm border border-gray-100  mb-8 w-full sticky top-0 z-10">
                        {/* Category Chips */}
                        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#111418] text-white px-4 transition-all shadow-sm">
                                <p className="text-sm font-medium leading-normal">All</p>
                            </button>
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f2f4] hover:bg-gray-200   px-4 transition-all">
                                <p className="text-[#111418]  text-sm font-medium leading-normal">
                                    Medical
                                </p>
                            </button>
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f2f4] hover:bg-gray-200   px-4 transition-all">
                                <p className="text-[#111418]  text-sm font-medium leading-normal">
                                    Education
                                </p>
                            </button>
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f2f4] hover:bg-gray-200   px-4 transition-all">
                                <p className="text-[#111418]  text-sm font-medium leading-normal">
                                    Environment
                                </p>
                            </button>
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f2f4] hover:bg-gray-200   px-4 transition-all">
                                <p className="text-[#111418]  text-sm font-medium leading-normal">
                                    Emergency
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {/* Card 1 */}
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center rounded-md bg-white/90  px-2 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-gray-500/10">
                                        Medical
                                    </span>
                                </div>
                                <div
                                    className="bg-center bg-no-repeat bg-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    data-alt="Close up of a smiling child receiving medical checkup"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGOQpgED5PuZMfTsf_QtePK_Q8N_U9_IiQ6vGFtHdKEKPxBrJk1xNd5fXKuvvpySf2gbt-f6_SZUYCgWDC4P45mW4b49Ts6tIIo7Ng8lBJTFIdvkuolt6rTBvo8fDs26jWgz0osGd5oywJHf8moJ_tKson7qp3KVV8GzWeFEJ_iYHgCbs3FdiglmLF3jfphM8eXpFoYj1B3UWRDsBfa2RmuWeFCzTQ3Oi0aN1R5DnAuGKNytFhwaOP61IbOG3HisUwE6vuBQ_JZHyL")'
                                    }}
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-4">
                                <div>
                                    <h3 className="text-[#111418]  text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                                        Life-Saving Surgery for Maya
                                    </h3>
                                    <p className="text-[#617589]  text-sm leading-normal line-clamp-2">
                                        Maya needs urgent heart surgery to survive. Your donation will
                                        directly fund her medical procedure and recovery care.
                                    </p>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    <div className="w-full bg-gray-100  rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: "75%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-[#111418] ">
                                            $15,000{" "}
                                            <span className="font-normal text-gray-500">raised</span>
                                        </span>
                                        <span className="text-gray-500">of $20,000</span>
                                    </div>
                                </div>
                                <button className="w-full mt-2 rounded-lg bg-primary py-2.5 px-4 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center rounded-md bg-white/90  px-2 py-1 text-xs font-bold text-green-600 ring-1 ring-inset ring-gray-500/10">
                                        Environment
                                    </span>
                                </div>
                                <div
                                    className="bg-center bg-no-repeat bg-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    data-alt="Group of volunteers planting trees in a field"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYl22eaL0y-xvP3WfS4jnYAhSneKOHjyMd__OrNDkfWmISRYc4zYOnzUambhtsfC3Mtp6MIc0KHGie9bvhl1UMZL5E3upGxZ_HvW81HiCOeJVsuevEb0fgnPvlk3avpultoavRgKIGL8cdauqRyVCd5Hoe8BD492SuY4olCDlWKSvAj7ejlBL2DC8-bMX2j9UfZ_uCtO__bCyDGe5NrfavDz6dnzczdt_WW_fbfMFfJGZoMs6hNufk9CPdBNSynQjjqjpB2LrXTlVN")'
                                    }}
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-4">
                                <div>
                                    <h3 className="text-[#111418]  text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                                        Reforest the Amazon
                                    </h3>
                                    <p className="text-[#617589]  text-sm leading-normal line-clamp-2">
                                        Join our mission to plant 10,000 trees this month. Help us
                                        restore biodiversity and combat climate change.
                                    </p>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    <div className="w-full bg-gray-100  rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: "45%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-[#111418] ">
                                            $4,500{" "}
                                            <span className="font-normal text-gray-500">raised</span>
                                        </span>
                                        <span className="text-gray-500">of $10,000</span>
                                    </div>
                                </div>
                                <button className="w-full mt-2 rounded-lg bg-primary py-2.5 px-4 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center rounded-md bg-white/90  px-2 py-1 text-xs font-bold text-orange-600 ring-1 ring-inset ring-gray-500/10">
                                        Emergency
                                    </span>
                                </div>
                                <div
                                    className="bg-center bg-no-repeat bg-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    data-alt="Red Cross tents set up in a disaster zone"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-GoUsbdbjsEIee2fkYYT2VHQ9gsOhc1H-s6NW-HO19QJzWgSbka-WQrvfzpZ0AxwA6b91qGpLe0YJjjkk6Sp9QeoZ4rymCxL6aRt2ve1Tz4tC2J9rgnCcGD_grgYf3Hh0PcfYpscFUnPSp-hkgyoDvI0AXSA7SdGUu-tFCccnH0pVTebOU6Ff9ULAh_H4DixlFaPEuxR1OKGHNLlc1Uj9ytKN-cVd42R6orZ67ZEIgaCzkQKMwml-sxjcwLIKRS_7PPGPJS7yNTHh")'
                                    }}
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-4">
                                <div>
                                    <h3 className="text-[#111418]  text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                                        Earthquake Relief Fund
                                    </h3>
                                    <p className="text-[#617589]  text-sm leading-normal line-clamp-2">
                                        Thousands have been displaced. We are providing food, shelter,
                                        and medical aid to affected families immediately.
                                    </p>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    <div className="w-full bg-gray-100  rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: "92%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-[#111418] ">
                                            $92,000{" "}
                                            <span className="font-normal text-gray-500">raised</span>
                                        </span>
                                        <span className="text-gray-500">of $100,000</span>
                                    </div>
                                </div>
                                <button className="w-full mt-2 rounded-lg bg-primary py-2.5 px-4 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                        {/* Card 4 */}
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center rounded-md bg-white/90  px-2 py-1 text-xs font-bold text-blue-600 ring-1 ring-inset ring-gray-500/10">
                                        Education
                                    </span>
                                </div>
                                <div
                                    className="bg-center bg-no-repeat bg-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    data-alt="Young students raising hands in a classroom"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBqG8eqb54uqzEh0_lPuzJvQGjXwNJzHInlNOCUsX4U7IhNUSxy0cza_RL0TbnsLn6IqIQjWjw05kwEi68bY4EKFx9G1K84LRoEgldM5La94eKP3EHVf08Qtya1M4oq9URGcTxJLig2jvXlnUlGhXve3km8IHehqBWLF6JTPwAYICVhPmWabfdAHGZ6tlLeZTD8vL3wUMqeetUHUhOmOCabomO1fc5GzglUJD4Ok93FpNa_DT85HH1zBZ-zVzI4MtzOo3ntuu4W0gf")'
                                    }}
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-4">
                                <div>
                                    <h3 className="text-[#111418]  text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                                        Books for Rural Schools
                                    </h3>
                                    <p className="text-[#617589]  text-sm leading-normal line-clamp-2">
                                        Providing textbooks and stationery to underfunded schools in
                                        rural areas to support child literacy.
                                    </p>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    <div className="w-full bg-gray-100  rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: "30%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-[#111418] ">
                                            $1,500{" "}
                                            <span className="font-normal text-gray-500">raised</span>
                                        </span>
                                        <span className="text-gray-500">of $5,000</span>
                                    </div>
                                </div>
                                <button className="w-full mt-2 rounded-lg bg-primary py-2.5 px-4 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                        {/* Card 5 */}
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center rounded-md bg-white/90  px-2 py-1 text-xs font-bold text-purple-600 ring-1 ring-inset ring-gray-500/10">
                                        Animals
                                    </span>
                                </div>
                                <div
                                    className="bg-center bg-no-repeat bg-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    data-alt="Rescue dog looking happy in a shelter"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJPONQo3W9j5gpHIe7RScBV--MaIms2hiEhIiglJKW2p16WzzxowdpjBKXhBQW1lm73qPYje3Xsf9YKx9XaSw97iqfdQ8IidTgR-HoV4V8Pg-grzTvEkDYXMseP2YRz0I6fKGwACkxoqp2w4VUhhHV6nFOaZJGyVUKH2mXEx-jb_rme-HWN8bIhlPN_F3tmKiZJ27dPJSS1eKjjtubOU9FdfI6sTBY1VHg94xOZGi49x0lSMBcUtotrpei4x-IYoxSX8Asivi0T337")'
                                    }}
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-4">
                                <div>
                                    <h3 className="text-[#111418]  text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                                        City Shelter Expansion
                                    </h3>
                                    <p className="text-[#617589]  text-sm leading-normal line-clamp-2">
                                        We are running out of space. Help us build a new wing to house
                                        50 more abandoned pets this winter.
                                    </p>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    <div className="w-full bg-gray-100  rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: "60%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-[#111418] ">
                                            $30,000{" "}
                                            <span className="font-normal text-gray-500">raised</span>
                                        </span>
                                        <span className="text-gray-500">of $50,000</span>
                                    </div>
                                </div>
                                <button className="w-full mt-2 rounded-lg bg-primary py-2.5 px-4 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                        {/* Card 6 */}
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white  border border-gray-200  shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-flex items-center rounded-md bg-white/90  px-2 py-1 text-xs font-bold text-cyan-600 ring-1 ring-inset ring-gray-500/10">
                                        Clean Water
                                    </span>
                                </div>
                                <div
                                    className="bg-center bg-no-repeat bg-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    data-alt="Hands holding fresh clean water from a pump"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4CXtiHy5be5ElSwOb_UQuNkfyx9jO-JYcDwzcKUgzbRIy4sUNkZ-Ms1VaQJUFG0tU1IKnR3gvt90C2bi3JXsWbySVY1Mh4R6R76ZG86ZZVj-V-o3_pN1JlhHqyvkgffUVoH5VyvyQ9zClUJUwockCVG7FX7Npwm1bAdkGIOX0d6My_OjwH77ChcELyje_JOYLJ4kwTdwF74a5BC1QogOEgCcuP1ZraM1nkP_fZefciXtu7hsZZ5UoLKXBi0HvaksEaG1-5j8poPhb")'
                                    }}
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-4">
                                <div>
                                    <h3 className="text-[#111418]  text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                                        Clean Water for Village X
                                    </h3>
                                    <p className="text-[#617589]  text-sm leading-normal line-clamp-2">
                                        Bringing a sustainable water source to a remote village,
                                        reducing disease and improving quality of life.
                                    </p>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    <div className="w-full bg-gray-100  rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: "88%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-[#111418] ">
                                            $8,800{" "}
                                            <span className="font-normal text-gray-500">raised</span>
                                        </span>
                                        <span className="text-gray-500">of $10,000</span>
                                    </div>
                                </div>
                                <button className="w-full mt-2 rounded-lg bg-primary py-2.5 px-4 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </div>
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
        {/* Footer */}
        <footer className="bg-white  border-t border-gray-100  pt-16 pb-8 px-4 md:px-10 lg:px-40">
            <div className="max-w-300 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 text-[#111418] mb-4">
                            <div className="size-6 text-primary">
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm-2-26h4v12h-4V14zm0 16h4v4h-4v-4z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold">HopeGive</span>
                        </div>
                        <p className="text-sm text-[#617589] leading-relaxed">
                            Empowering communities and saving lives through direct,
                            transparent, and impactful giving.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#111418] mb-4">
                            About Us
                        </h4>
                        <ul className="flex flex-col gap-2 text-sm text-[#617589] ">
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Our Mission
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Team
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Financials
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#111418]  mb-4">
                            Get Involved
                        </h4>
                        <ul className="flex flex-col gap-2 text-sm text-[#617589] ">
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Donate Monthly
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Fundraise
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Volunteer
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-primary transition-colors" href="#">
                                    Corporate Partners
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#111418] mb-4">
                            Connect
                        </h4>
                        <div className="flex gap-4 mb-4">
                            <a
                                className="text-[#617589] hover:text-primary transition-colors"
                                href="#"
                            >
                                <span className="sr-only">Facebook</span>
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                className="text-[#617589] hover:text-primary transition-colors"
                                href="#"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a
                                className="text-[#617589] hover:text-primary transition-colors"
                                href="#"
                            >
                                <span className="sr-only">Instagram</span>
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.016 1.992c-2.854 0-3.187.012-4.041.051-.879.04-1.357.197-1.675.32-.416.162-.714.356-.924.566-.21.21-.405.508-.566.923-.123.318-.28.796-.32 1.676-.04.853-.05 1.186-.05 4.04v.538c0 2.853.01 3.187.05 4.04.04.88.197 1.358.32 1.676.162.416.356.714.566.924.21.21.508.405.923.566.318.123.796.28 1.676.32.853.04 1.186.05 4.04.05h.538c2.853 0 3.187-.01 4.04-.05.88-.04 1.358-.197 1.676-.32.416-.162.714-.356.924-.566.21-.21.405-.508.566-.923.123-.318.28-.796.32-1.676.04-.853.05-1.186.05-4.04v-.538c0-2.853-.01-3.187-.05-4.04-.04-.88-.197-1.358-.32-1.676-.162-.416-.356-.714-.566-.924-.21-.21-.508-.405-.923-.566-.318-.123-.796-.28-1.676-.32-.854-.04-1.187-.05-4.041-.05h-.538zm.538 3.55a4.875 4.875 0 110 9.75 4.875 4.875 0 010-9.75zm0 1.992a2.883 2.883 0 100 5.766 2.883 2.883 0 000-5.766zm5.337-4.325a1.326 1.326 0 110 2.652 1.326 1.326 0 010-2.652z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[#617589] ">
                        © 2023 HopeGive Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-[#617589]">
                        <a className="hover:text-primary transition-colors" href="#">
                            Privacy Policy
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </>

}
