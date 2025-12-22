const ReadMorePage = () => {
    return <>
        {/* Top Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm bg-black/10 border-b border-white/5 transition-all duration-300">
            <div className="flex items-center gap-2 group cursor-pointer">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-180 transition-transform duration-700">
                    all_inclusive
                </span>
                <h1 className="text-2xl font-bold tracking-widest text-white font-display">
                    AURA
                </h1>
            </div>
            <div className="hidden md:flex items-center gap-10">
                <a
                    className="text-sm font-medium tracking-widest text-gray-300 hover:text-primary transition-colors uppercase"
                    href="#"
                >
                    Philosophy
                </a>
                <a
                    className="text-sm font-medium tracking-widest text-gray-300 hover:text-primary transition-colors uppercase"
                    href="#"
                >
                    Impact
                </a>
                <a
                    className="text-sm font-medium tracking-widest text-gray-300 hover:text-primary transition-colors uppercase"
                    href="#"
                >
                    Login
                </a>
                <button className="relative overflow-hidden rounded-full border border-primary/50 px-6 py-2 text-primary hover:bg-primary hover:text-black transition-all duration-300 group">
                    <span className="relative z-10 text-xs font-bold uppercase tracking-widest">
                        Connect Wallet
                    </span>
                    <div className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
            </div>
            <button className="md:hidden text-white">
                <span className="material-symbols-outlined">menu</span>
            </button>
        </nav>
        {/* Section 1: The Hook (Hero) */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
            {/* Abstract Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-radiant-amethyst/10 rounded-full blur-[150px] pointer-events-none" />
            {/* Central Particle Orb Visual */}
            <div className="relative z-10 mb-12 animate-[float_6s_ease-in-out_infinite]">
                <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-black relative flex items-center justify-center">
                    {/* Image placeholder for Particle Orb */}
                    <img
                        alt="Particle Orb"
                        className="w-full h-full object-cover rounded-full opacity-80 mix-blend-screen animate-pulse"
                        data-alt="Abstract glowing gold particle orb in dark space simulating digital bioluminescence"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyoQulJvL7N8tNMrZXn0P4cCSqTOCK-ZG4kjd5tiyTSdawMyJMgry8tXoV-hn7YXfn1AGCHJSwYiCWbluSO4t2dQJpjYV9RKI90EMKxmsCSc_Iwidj7sbxA7v79yTdQILRMaYOc6YQld6s4Mx_Zyh_iv1U9LcDVpjZAfIWsFer-hwNRbCB8V4rP01F3-35lENSjHnXXBuynRSh6jIDLaVo6TeN_u8DO54M_kz5F9irMF22XGfLGS2VyLa0fqXbPIEjG3ToAwiTVDto"
                        style={{ animationDuration: "4s" }}
                    />
                    <div className="absolute inset-0 rounded-full border border-primary/20 scale-110" />
                    <div className="absolute inset-0 rounded-full border border-primary/10 scale-125 dashed" />
                </div>
            </div>
            <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-transparent bg-clip-text bg-linear-to-b from-white via-white to-gray-500 text-glow">
                    Ignite the World.
                    <br />
                    <span className="text-gradient-gold">One Spark at a Time.</span>
                </h1>
                <p className="font-display text-lg md:text-xl text-gray-300 max-w-2xl tracking-wide font-light leading-relaxed">
                    Your existence is energy. Transform that energy into impact right now.
                </p>
                <button className="shard-button group relative mt-8 flex items-center justify-center bg-primary px-12 py-5 text-black">
                    <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12" />
                    <span className="relative z-10 text-lg font-bold tracking-widest uppercase flex items-center gap-2">
                        Release Your Light
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </span>
                </button>
            </div>
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-xs uppercase tracking-[0.3em]">Explore</span>
                <span className="material-symbols-outlined text-primary">
                    keyboard_arrow_down
                </span>
            </div>
        </section>
        {/* Connecting Filigree Line */}
        <div className="hidden md:block absolute left-1/2 top-[100vh] w-px h-[300vh] bg-linear-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2 z-0" />
        {/* Section 2: The Emotional Connection */}
        <section className="relative py-32 overflow-hidden w-full">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Content Grid with Diagonal Feel */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    {/* Text Block Left */}
                    <div className="md:col-span-5 md:col-start-2 flex flex-col gap-6 text-left relative z-20">
                        <span className="inline-block text-electric-turquoise text-sm font-bold tracking-[0.2em] uppercase mb-2">
                            Alchemy
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight font-display">
                            This isn't charity. <br />
                            <span className="text-gradient-gold italic">It’s alchemy.</span>
                        </h2>
                        <p className="text-lg text-gray-300 font-light leading-relaxed border-l-2 border-primary/30 pl-6">
                            You are turning intention into reality. Feel the rush of immediate
                            consequence. Every interaction here ripples outward into the real
                            world.
                        </p>
                    </div>
                    {/* Abstract Visual Right (Floating Glass) */}
                    <div className="md:col-span-5 md:col-start-8 relative h-125 w-full">
                        <div className="absolute inset-0 bg-glass-gradient backdrop-blur-md rounded-[3rem] border border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden group">
                            <img
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                                data-alt="Translucent 3D glass flower abstract shape glowing blue and purple"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA56X9xWQiGzPzaLixjRLjJ8DjQe3ntK19r_Cz_APt9p7RD5uGueZ1pT9Z70z_KXIXMCxNFLAhd0ltTa1sGyeE07SSS3vtDTu4Z3JKa42jOQrZUSFNZjvT6INT_r4FSAQ8NZeVJO8iGeSIjP_wTMTURBIMZh67a_4Eq_9Sm9r-fpCuU0t4Ea-6n7FeeqKVuFEE0ywh33DTcBXyooV15z0PqsUJC7S57yNfE0jVFJEaxVp6djfQEzByWAftf5MuCrlYhtlFBmtyCz_w"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold text-xl">Transformation</p>
                                        <p className="text-electric-turquoise text-sm tracking-wider">
                                            Project: Clean Water
                                        </p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                        <span className="material-symbols-outlined text-white">
                                            water_drop
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating decorative elements */}
                        <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-primary/20 blur-xl" />
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-electric-turquoise/20 blur-xl" />
                    </div>
                </div>
                {/* Second Row - Reverse Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-32">
                    {/* Abstract Visual Left */}
                    <div className="md:col-span-5 md:col-start-2 relative h-100 w-full order-2 md:order-1">
                        <div className="absolute inset-0 bg-glass-gradient backdrop-blur-md rounded-[3rem] border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden group">
                            <img
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                                data-alt="Abstract crystal geometric shape floating in dark void with golden light"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIsmd_C6KsIl-aw03F4jCK944XElWRj5PsbSodaRt-8Rvd2tgw5pFQkbcvCj5HgRw1ntlfNsfhUmhuPT2tud2O1GaHzRAZSO7zE6wf42Ts2H3rzLXz3A_4UlirQqhyNibaz_nmcvuyFTO4XUP1NxxO9ztZ2iOn4sVmosJDs8s1YzGry1pH4owpKxKNCjPXcf6RRw5f75u7a97Eaiq5aqYp1_Z2cmCe42_qKAkkmJKkm9yxa9UykWEswdtCouI17En8AF6azR8LQI57"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold text-xl">Connection</p>
                                        <p className="text-radiant-amethyst text-sm tracking-wider">
                                            Project: Education
                                        </p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                        <span className="material-symbols-outlined text-white">
                                            school
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Text Block Right */}
                    <div className="md:col-span-5 md:col-start-8 flex flex-col gap-6 text-left relative z-20 order-1 md:order-2">
                        <span className="inline-block text-radiant-amethyst text-sm font-bold tracking-[0.2em] uppercase mb-2">
                            Impact
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight font-display">
                            Rippling outward into <br />
                            <span className="text-white">the real world.</span>
                        </h2>
                        <p className="text-lg text-gray-300 font-light leading-relaxed">
                            Don't just observe the change. Be the catalyst. Every donation
                            creates a spectrum of opportunity for those in the shadows.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-primary/50" />
                            <div className="w-2 h-2 rounded-full bg-primary/20" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Section 3: The "Bedazzling" Donation Mechanism */}
        <section className="relative py-40 bg-black/20 overflow-hidden">
            {/* Background light streak */}
            <div className="absolute top-1/2 left-0 w-full h-125 -translate-y-1/2 bg-linear-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
            <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col items-center">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-5xl md:text-7xl font-black font-display tracking-tight">
                        Wield Your Power.
                    </h2>
                    <p className="text-xl text-gray-400 font-light tracking-wide">
                        Slide to amplify your aura.
                    </p>
                </div>
                {/* Custom Slider Component */}
                <div className="w-full max-w-3xl relative py-12 group">
                    {/* Track Glow */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-linear-to-r from-gray-800 via-gray-600 to-gray-800 -translate-y-1/2 rounded-full" />
                    {/* Active Track (Simulated at 60%) */}
                    <div className="absolute top-1/2 left-0 w-[60%] h-2 bg-linear-to-r from-primary/50 via-primary to-white -translate-y-1/2 rounded-full shadow-[0_0_20px_rgba(255,217,0,0.8)]" />
                    {/* The Jewel Thumb (Simulated) */}
                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-20">
                        <div className="w-full h-full bg-primary rotate-45 border-4 border-white shadow-[0_0_40px_rgba(255,217,0,1)] flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-white/50 animate-pulse" />
                            <span className="material-symbols-outlined text-black font-bold transform -rotate-45">
                                diamond
                            </span>
                        </div>
                    </div>
                    {/* Labels */}
                    <div className="w-full flex justify-between mt-12 text-sm font-bold tracking-widest text-gray-500 uppercase">
                        <span>Spark</span>
                        <span className="text-primary text-glow">Beacon</span>
                        <span>Supernova</span>
                    </div>
                </div>
                {/* Dynamic Feedback Text */}
                <div className="mt-12 text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm max-w-lg w-full">
                    <p className="text-4xl font-bold font-display text-primary mb-2">
                        $250
                    </p>
                    <p className="text-2xl text-white font-medium">You are a beacon.</p>
                    <p className="text-sm text-gray-400 mt-4">
                        Providing 50 families with solar light for a year.
                    </p>
                </div>
            </div>
        </section>
        {/* Section 4: The Climax (Footer) */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
            {/* Vortex Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                {/* Simulated vortex with multiple rotating gradients */}
                <div className="w-200 h-200 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#9d00ff_120deg,transparent_180deg)] blur-3xl animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-150 h-150 rounded-full bg-[conic-gradient(from_180deg,transparent_0deg,#ffd900_120deg,transparent_180deg)] blur-3xl animate-[spin_8s_linear_infinite_reverse]" />
            </div>
            <div className="relative z-10 text-center space-y-12 px-6">
                <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white max-w-3xl leading-tight">
                    The future is waiting for your signal.
                </h2>
                <div className="flex flex-col items-center justify-center gap-8 mt-12">
                    {/* Heartbeat Button */}
                    <button className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center group pulse-btn transition-transform duration-300 hover:scale-105 active:scale-95">
                        {/* Background Layers */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary via-orange-400 to-radiant-amethyst opacity-90 blur-sm group-hover:blur-md transition-all" />
                        <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center z-10 border border-white/10">
                            <div className="text-center space-y-1">
                                <span className="block text-3xl font-bold text-white tracking-tighter">
                                    FINALIZE
                                </span>
                                <span className="block text-xl text-primary font-light tracking-[0.2em] uppercase">
                                    Impact
                                </span>
                            </div>
                        </div>
                        {/* Inner Ring */}
                        <div className="absolute inset-4 rounded-full border border-white/5 z-20 group-hover:inset-6 transition-all duration-500" />
                    </button>
                    <p className="text-gray-400 text-sm tracking-widest uppercase mt-8">
                        Secure Transaction • Ethereum Mainnet • Tax Deductible
                    </p>
                </div>
            </div>
            {/* Footer Links Minimal */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-xs text-gray-600 uppercase tracking-widest z-20">
                <a className="hover:text-primary transition-colors" href="#">
                    Privacy
                </a>
                <a className="hover:text-primary transition-colors" href="#">
                    Terms
                </a>
                <a className="hover:text-primary transition-colors" href="#">
                    Contact
                </a>
            </div>
        </section>
    </>

}

export default ReadMorePage;