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
        <footer className="bg-white  border-t border-gray-200  py-10">
            <div className="layout-container px-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary">
                        <svg
                            className="w-full h-full"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <span className="text-[#111418]  font-bold text-lg">
                        DonationPlatform
                    </span>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <a
                        className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                        href="#"
                    >
                        Privacy Policy
                    </a>
                    <a
                        className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                        href="#"
                    >
                        Terms of Service
                    </a>
                    <a
                        className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                        href="#"
                    >
                        Cookies
                    </a>
                    <a
                        className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                        href="#"
                    >
                        Support
                    </a>
                </div>
                <p className="text-sm text-gray-400">
                    © 2023 DonationPlatform. All rights reserved.
                </p>
            </div>
        </footer>
    </>

}
