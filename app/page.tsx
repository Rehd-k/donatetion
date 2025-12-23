import { auth } from "@/auth";
import LogoutButton from "@/components/logout";
import { Campaign } from "@/lib/model/campaign";
import { Feather, FolderOpen, LogOut, Rss, SendToBack, University } from "lucide-react";
import Link from "next/link";
import CampaignsClient from "./(protected)/campaigns/campaigns";
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/model/users";

export default async function AuraHome() {
  await dbConnect();
  let user;
  let userFavorites;
  const session = await auth();
  if (session) {
    user = await User.findById(session?.user.id);
    userFavorites = await User.findById(session?.user.id).populate('favorites');
  }

  const campaigns = await Campaign.find({}).lean().limit(3).sort({ createdAt: -1 });



  return <>
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
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
          {session ? <LogoutButton /> : <Link href="/login" className="flex min-w-30 cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-blue-700 hover:bg-primary-dark transition-all text-white text-base font-bold shadow-lg transform hover:-translate-y-0.5">
            <span className="truncate">Login</span>
          </Link>

          }



        </div>
      </header>
      {/* Hero Section */}
      <div className="w-full bg-white ">
        <div className="@container">
          <div
            className="flex flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 py-20 md:px-10 lg:px-40 min-h-140"
            data-alt="Warm gradient overlay on an image of happy diverse volunteers helping community"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgnDfzvdItkPj-EPO2Hlienq7uG6AZRb1K09unDLWNAyEnKUsWFaeaXeC_3BGF-4DyL39DH1TivfomhHxml7ZUWlM27ya9T_u-zSqzq3Hhze72BwEZJUb53xVVZPKl-TpmC3TRJY0eQUDUU1KB96une8qBgwciy1ojN-YOWmrUjh4R1TRTyrObvQVgrjNCVvgBfsRKdON7KwJWaZXIrTq3b3c5QiUyEorm4nUzOvyKngxLUoVUyHWw7l4ueMrqPoxzrxC6zx8bFnA9")'
            }}
          >
            <div className="flex flex-col gap-4 text-left max-w-180">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl drop-shadow-sm">
                Your Donation Can Change Lives Today
              </h1>
              <h2 className="text-white/90 text-lg font-normal leading-relaxed md:text-xl max-w-150 drop-shadow-sm">
                Join our mission to bring hope and resources to those who need it
                most. Every contribution makes a real, measurable difference.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/dashboard" className="flex min-w-30 cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-blue-700 hover:bg-primary-dark transition-all text-white text-base font-bold shadow-lg transform hover:-translate-y-0.5">
                <span className="truncate">Donate Now</span>
              </Link>
              <Link href="donatetocampaigns" className="flex min-w-30 cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-base font-bold transition-all">
                <span className="truncate">View Our Causes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Impact Statistics */}
      <div className="px-4 py-12 md:px-10 lg:px-40 bg-white ">
        <div className="layout-content-container mx-auto flex flex-col max-w-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-4">
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[#f6f7f8]">
              <span className="material-symbols-outlined text-primary ">
                <SendToBack className="text-4xl mb-2 text-gray-700" />
              </span>
              <h2 className="text-[#111418]  text-2xl md:text-3xl font-bold leading-tight">
                $1.2M
              </h2>
              <p className="text-[#617589]  text-sm font-medium">
                Total Raised
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[#f6f7f8]">
              <University className="text-4xl mb-2 text-gray-700" />

              <h2 className="text-[#111418]  text-2xl md:text-3xl font-bold leading-tight">
                50k+
              </h2>
              <p className="text-[#617589]  text-sm font-medium">
                Lives Helped
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[#f6f7f8]">
              <FolderOpen className="text-gray-700 text-4xl mb-2" />

              <h2 className="text-[#111418]  text-2xl md:text-3xl font-bold leading-tight">
                120
              </h2>
              <p className="text-[#617589]  text-sm font-medium">
                Active Projects
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[#f6f7f8]">
              <Rss className="text-gray-700 text-4xl mb-2" />
              <h2 className="text-[#111418]  text-2xl md:text-3xl font-bold leading-tight">
                15
              </h2>
              <p className="text-[#617589]  text-sm font-medium">
                Countries Reached
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Featured Causes */}
      <div className="px-4 py-12 md:px-10 lg:px-40 bg-[#f6f7f8]/50 ">
        <div className="layout-content-container mx-auto flex flex-col max-w-300">
          <div className="flex justify-between items-end mb-8 px-4">
            <div>
              <h2 className="text-[#111418]  text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">
                Featured Causes
              </h2>
              <p className="text-[#617589]  mt-2">
                Support a specific mission close to your heart.
              </p>
            </div>
            <a
              className="hidden md:block text-primary font-bold hover:underline"
              href="#"
            >
              View All
            </a>
          </div>
          <CampaignsClient campaignsList={JSON.stringify(campaigns)} userFavorites={userFavorites ? JSON.stringify(userFavorites.favorites) : JSON.stringify([])} user={user ? JSON.stringify(user) : null} />

          <div className="mt-6 text-center md:hidden">
            <a className="text-primary font-bold hover:underline" href="#">
              View All Causes
            </a>
          </div>
        </div>
      </div>
      {/* How It Works */}
      <div className="px-4 py-16 md:px-10 lg:px-40 bg-white ">
        <div className="mx-auto flex flex-col max-w-300">
          <div className="text-center mb-12">
            <h2 className="text-[#111418]  text-2xl md:text-3xl font-bold leading-tight">
              How Your Donation Works
            </h2>
            <p className="text-[#617589]  mt-2 max-w-lg mx-auto">
              Three simple steps to making a lasting impact in the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-blue-50  flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl text-blue-800">
                  ads_click
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111418] ">
                1. Choose a Cause
              </h3>
              <p className="text-sm text-[#617589]  leading-relaxed max-w-xs">
                Browse our verified projects and select a cause that resonates
                with your values.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-blue-50  flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl text-blue-800">lock</span>
              </div>
              <h3 className="text-lg font-bold text-[#111418] ">
                2. Donate Securely
              </h3>
              <p className="text-sm text-[#617589]  leading-relaxed max-w-xs">
                Make a tax-deductible contribution through our 100% secure payment
                gateway.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-blue-50  flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl text-blue-800">
                  sentiment_satisfied_alt
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111418] ">
                3. See Real Impact
              </h3>
              <p className="text-sm text-[#617589]  leading-relaxed max-w-xs">
                Receive updates and reports showing exactly how your money changed
                lives.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Trust & Transparency */}
      <div className="px-4 py-12 md:px-10 lg:px-40 bg-gray-50  border-y border-gray-100 ">
        <div className="mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 max-w-300">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-green-600 text-3xl">
              verified_user
            </span>
            <div>
              <h4 className="font-bold text-[#111418] ">
                100% Secure
              </h4>
              <p className="text-xs text-[#617589] ">
                Encrypted Payments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600 text-3xl">
              verified
            </span>
            <div>
              <h4 className="font-bold text-[#111418] ">
                Verified Charity
              </h4>
              <p className="text-xs text-[#617589] ">
                Officially Registered
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-purple-600 text-3xl">
              assignment
            </span>
            <div>
              <h4 className="font-bold text-[#111418] ">
                Transparent
              </h4>
              <p className="text-xs text-[#617589] ">
                Quarterly Reports
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="px-4 py-16 md:px-10 lg:px-40 bg-white">
        <div className="mx-auto flex flex-col max-w-300">
          <div className="text-center mb-12">
            <h2 className="text-[#111418] text-2xl md:text-3xl font-bold leading-tight">
              What Our Donors Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm flex gap-4">
              <div
                className="size-12 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                data-alt="Portrait of Sarah"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8KNbHZIwWUHz0yP4DzwO7651eWV3wadTTCavqMnLtJ-DTI9dIFI8OHMBMuO9phD2zjMulhWnwAlb1sw7vie2tQ6KmAdkqxf8Jn-WAG9uZuBYL5ElsIrWDI1S-Uur41vP3aBP6ccvF9ZJJ4-ubaIGJ1LrLIWZETZ4Xv6zml4xJzm-BrK_AaMlpOvnPKWYa8oqK3YZve1UhFpf03HkvzgasBcmYpX9pJHfh35XnB6nt_LcQj5tB9aTi5yi7Krt8FjGjGA6sUOAKUz11")'
                }}
              />
              <div>
                <p className="text-[#111418] italic mb-3">
                  "I love seeing exactly where my money goes. The transparency
                  reports give me full confidence that my donation is making a
                  real difference."
                </p>
                <p className="text-sm font-bold text-[#111418]">
                  Sarah Jenkins
                </p>
                <p className="text-xs text-[#617589]">
                  Donor since 2021
                </p>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm flex gap-4">
              <div
                className="size-12 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                data-alt="Portrait of Michael"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDX1FAnVPAGhzrhP3VQu32lfWBi-XRLX3vlpk8QBZmvWpDSKy-sgZqQNffbOw7zmDO1ARGJ95UHVUMNFQfSYsvtJZGss4OE8Nho86GrzdtcmzQ0sUEBlUYN_IhCcSulD2IMKFPeKYRc3vNKUMT8jsxI2m3tqowmuahIl9aXTMytvdLoGOHbfqMQyrcOuSh-aR5lMZQIsdujMrHiKLn_kwXAfDkVKUHqH7LAEMdrcsAGDDVPCgXUkdQPNbm4c5SJQNNnYjnT0kX3aK75")'
                }}
              />
              <div>
                <p className="text-[#111418] italic mb-3">
                  "Contributing to the Education for All initiative was seamless.
                  It feels good to be part of a community that cares."
                </p>
                <p className="text-sm font-bold text-[#111418] ">
                  Michael Chen
                </p>
                <p className="text-xs text-[#617589] ">
                  Regular Contributor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Final Call to Action */}
      <div className="w-full bg-blue-600 py-20 px-4 md:px-10 lg:px-40 text-center relative overflow-hidden group">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 items-center">
          <h2 className=" text-3xl md:text-4xl font-bold leading-tight">
            Join Thousands Making a Difference
          </h2>
          <p className="text-gray/90 text-lg max-w-xl">
            Every second counts. Your support today can provide food, water, and
            education to someone in need tomorrow.
          </p>
          <Link href={'/donate'} className="flex items-center justify-center rounded-lg h-14 px-10 bg-blue-50 text-gray-700 hover:bg-blue-100 transition-colors text-lg font-bold shadow-lg mt-4">
            Donate Now
          </Link>
        </div>
      </div>
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
    </div>
  </>


}