'use client';

import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import MovieCard from '../components/MovieCard';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use environment variable for API URL, fallback to localhost for dev
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Try getting from LocalStorage first if no search
        if (!keyword) {
          const cachedMovies = localStorage.getItem('cachedMovies');
          if (cachedMovies) {
            setMovies(JSON.parse(cachedMovies));
            setLoading(false);
            // Background refresh
            fetch(`${API_URL}/api/movies`)
              .then(res => res.json())
              .then(data => {
                setMovies(data);
                localStorage.setItem('cachedMovies', JSON.stringify(data));
              })
              .catch(err => console.log("Background refresh failed", err));
            return;
          }
        }

        // Fetch from API
        const res = await fetch(`${API_URL}/api/movies?keyword=${keyword}`);
        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setMovies(data);

        // Update cache if this is the full list
        if (!keyword) {
          localStorage.setItem('cachedMovies', JSON.stringify(data));
        }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [keyword, API_URL]);

  // Group by category
  const categories = {};
  if (!keyword && movies.length > 0) {
    movies.forEach((movie) => {
      if (!categories[movie.category]) {
        categories[movie.category] = [];
      }
      categories[movie.category].push(movie);
    });
  }

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground">
      <Hero />

      <div className="md:mt-[-100px] relative z-30 px-6 space-y-8">
        {loading ? (
          <div className="text-center py-20"><p className="text-muted animate-pulse">Loading regrets...</p></div>
        ) : !movies || movies.length === 0 ? (
          <div className="text-center py-20 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 container mx-auto">
            <h2 className="text-3xl font-bold glitch-text mb-4">404: Content Not Found</h2>
            <p className="text-muted">
              {keyword ? `The regrets matching "${keyword}" exist only in your memory.` : "The server is probably sleeping. Or broken. Like us."}
            </p>
          </div>
        ) : keyword ? (
          // Search Results Grid
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold border-l-4 border-accent pl-4 mb-8">
              Search Results: {keyword}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          // Category Rows
          Object.keys(categories).map((category) => (
            <MovieRow key={category} title={category} movies={categories[category]} />
          ))
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background text-foreground"><p className="animate-pulse">Loading...</p></div>}>
      <HomeContent />
    </Suspense>
  );
}
