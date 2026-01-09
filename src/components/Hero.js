const Hero = () => {
    return (
        <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50 blur-sm"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop')",
                }}
            />

            <div className="relative z-20 text-center max-w-3xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
                    Movie not found.<br />
                    <span className="text-accent">Productivity also missing.</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted mb-8">
                    Error 404: Sleep schedule not found.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-3 bg-accent text-white rounded-md font-bold hover:bg-red-700 transition-colors flex items-center gap-2">
                        ▶ Waste Time
                    </button>
                    <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md font-bold hover:bg-white/20 transition-colors">
                        + Add to Watchlist
                    </button>
                </div>
                <p className="mt-4 text-xs text-muted/50 uppercase tracking-widest">
                    Recommended by 9 out of 10 procrastinators
                </p>
            </div>
        </div>
    );
};

export default Hero;
