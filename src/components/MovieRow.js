import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
    return (
        <div className="py-8 px-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground/90 flex items-center gap-2">
                {title}
                <span className="text-sm font-normal text-muted opacity-50 ml-2">
                    (Don't do it)
                </span>
            </h2>

            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard key={movie._id || movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieRow;
