import MovieRow from '../../components/MovieRow';

async function getAllMovies() {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/movies', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export default async function MoviesPage() {
    const movies = await getAllMovies();

    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 pb-20">
            <h1 className="text-3xl font-bold mb-8 glitch-text">All Regrets</h1>

            {movies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div key={movie._id} className="relative group">
                            <img src={movie.poster} alt={movie.title} className="w-full h-auto rounded-lg hover:scale-105 transition-transform" />
                            <div className="mt-2">
                                <h3 className="font-bold truncate">{movie.title}</h3>
                                <p className="text-xs text-muted">{movie.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">No movies found. Maybe go outside?</p>
            )}
        </div>
    );
}
