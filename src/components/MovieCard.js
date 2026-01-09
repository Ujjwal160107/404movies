import { Play, Star, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const MovieCard = ({ movie }) => {
    return (
        <Link href={`/movies/${movie._id || movie.id}`} className="group relative block flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:z-10">
            <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center">
                <h3 className="font-bold text-lg mb-2 text-white">{movie.title}</h3>

                <div className="flex items-center space-x-2 text-accent mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{movie.rating}</span>
                </div>

                <div className="bg-white text-black rounded-full p-3 mb-4 hover:bg-accent hover:text-white transition-colors">
                    <Play className="w-6 h-6 fill-current" />
                </div>

                <div className="flex items-center text-xs text-muted gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    <span>Regret: {movie.regretLevel}</span>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
