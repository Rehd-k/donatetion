import { Feather } from "lucide-react";
import Link from "next/link";
import ViewDonations from "./viewdonations";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/model/users";

export default async function CampaignsPage() {
    await dbConnect();
    let user;
    let userFavorites;
    const session = await auth();

    if (session) {
        user = await User.findById(session?.user.id);
        userFavorites = await User.findById(session?.user.id).populate('favorites');
    }
    return <>

        {/* Header / Navigation */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] bg-white  px-4 py-3 md:px-10 lg:px-40 shadow-sm">
            <Link href="/" className="flex items-center gap-4 text-[#111418] ">
                <div className="size-8 text-primary">
                    <Feather className="text-green-800" />
                </div>
                <h2 className="text-[#111418]  text-xl font-bold leading-tight tracking-[-0.015em]">
                    HopeFundr
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
        <ViewDonations />
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
                            <span className="text-lg font-bold">HopeFundr</span>
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
                        © 2023 HopeFundr Inc. All rights reserved.
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
