'use client';

import { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use environment variable for API URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${API_URL}/api/movies`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [API_URL]);

    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 pb-20">
            <h1 className="text-3xl font-bold mb-8 glitch-text">All Regrets</h1>

            {loading ? (
                <div className="text-center py-20"><p className="text-muted animate-pulse">Loading regrets...</p></div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                    {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="text-muted">No movies found. Maybe go outside?</p>
            )}
        </div>
    );
}
