import { Star, AlertTriangle, Clock, PlayCircle, ThumbsDown } from 'lucide-react';
import Link from 'next/link';

async function getMovie(id) {
    try {
        const res = await fetch(`http://127.0.0.1:5000/api/movies/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

export default async function MovieDetails({ params }) {
    const resolvedParams = await params;
    const movie = await getMovie(resolvedParams.id);

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center bg-background text-foreground">
                <div>
                    <h1 className="text-6xl font-bold glitch-text mb-4">404</h1>
                    <p className="text-2xl text-muted">Movie not found. Just like your motivation.</p>
                    <Link href="/" className="mt-8 inline-block px-6 py-3 bg-accent text-white rounded font-bold hover:bg-white/10 transition-colors">
                        Go Home to Waste Time
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground animate-fade-in relative overflow-hidden">

            {/* Background Backdrop */}
            <div className="absolute inset-0 z-0">
                <img src={movie.poster} alt="" className="w-full h-full object-cover opacity-30 blur-[50px] scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-transparent to-[#0b0b0b]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row gap-12 items-start">

                    {/* Poster */}
                    <div className="flex-shrink-0 w-full md:w-[350px] group relative">
                        <div className="absolute -inset-1 bg-gradient-to-br from-accent to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="relative w-full rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-grow pt-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md rounded-full border border-white/5 text-muted">
                                {movie.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight glitch-text text-white">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base font-medium">
                            <span className="bg-white/10 px-3 py-1 rounded border border-white/10">{movie.year}</span>
                            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded border border-yellow-500/20">
                                <Star className="fill-current w-4 h-4" />
                                <span>{movie.rating}/5</span>
                            </div>
                            <div className="flex items-center gap-1 text-accent bg-accent/10 px-3 py-1 rounded border border-accent/20">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Regret Level: {movie.regretLevel}</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-2xl mb-10">
                            <h3 className="text-xl font-bold mb-3 text-gray-200">Why you shouldn't watch this</h3>
                            <p className="text-lg text-gray-400 leading-relaxed border-l-4 border-accent pl-4 italic">
                                "{movie.description}"
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/movies">
                                <button className="px-8 py-4 bg-accent hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 flex items-center gap-3">
                                    <PlayCircle className="w-5 h-5" />
                                    Waste 2 Hours
                                </button>
                            </Link>
                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-all duration-300 flex items-center gap-3">
                                <ThumbsDown className="w-5 h-5" />
                                I Regret This Already
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Content / Reviews */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-accent">#</span> Verified Regret
                        </h3>
                        <div className="space-y-4">
                            <p className="italic text-gray-400">"I thought about being productive today. Then I saw this banner. Now I'm here. Send help."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                                <span className="text-sm font-bold text-gray-300">Procrastinator_99</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-accent">!</span> Critical Warning
                        </h3>
                        <p className="text-gray-400">
                            Watching this movie may cause severe loss of brain cells, missed deadlines, and an overwhelming sense of existential dread. User discretion is advised.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
