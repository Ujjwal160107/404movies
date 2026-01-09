import { Star, AlertTriangle, Clock } from 'lucide-react';

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
            <div className="min-h-screen flex items-center justify-center text-center">
                <div>
                    <h1 className="text-6xl font-bold glitch-text mb-4">404</h1>
                    <p className="text-2xl text-muted">Movie not found. Just like your motivation.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            <div className="relative h-[60vh]">
                <div className="absolute inset-0">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-50 blur-md" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="relative h-full flex items-end pb-12 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        <img src={movie.poster} alt={movie.title} className="w-64 rounded-lg shadow-2xl border border-white/10" />

                        <div className="mb-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

                            <div className="flex items-center gap-6 mb-6 text-sm md:text-base">
                                <span className="bg-accent px-2 py-1 rounded text-black font-bold">{movie.year}</span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="fill-current w-4 h-4" />
                                    <span>{movie.rating}/5</span>
                                </div>
                                <div className="flex items-center gap-1 text-red-500">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>Regret Level: {movie.regretLevel}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Waste 2 Hours
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 md:px-12 max-w-4xl mx-auto py-12">
                <h2 className="text-2xl font-bold mb-4">Why you shouldn't watch this</h2>
                <p className="text-muted text-lg leading-relaxed mb-8">
                    {movie.description}
                </p>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="font-bold mb-2">User Review</h3>
                    <p className="italic text-muted">"I could have learned a new language. Instead I watched this." - Verified User</p>
                </div>
            </div>
        </div>
    );
}
