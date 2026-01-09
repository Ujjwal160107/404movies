import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

async function getMovies(keyword = '') {
  try {
    // Use 127.0.0.1 to avoid Node.js localhost resolution issues
    const res = await fetch(`http://127.0.0.1:5000/api/movies?keyword=${keyword}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    // Return empty array to handle error gracefully on UI
    return [];
  }
}

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const keyword = resolvedSearchParams?.keyword || '';
  const movies = await getMovies(keyword);

  // Group by category
  const categories = {};
  if (Array.isArray(movies)) {
    movies.forEach((movie) => {
      if (!categories[movie.category]) {
        categories[movie.category] = [];
      }
      categories[movie.category].push(movie);
    });
  }

  return (
    <div className="min-h-screen pb-20">
      <Hero />

      <div className="mt-[-100px] relative z-30 space-y-8">
        {!movies || movies.length === 0 ? (
          <div className="text-center py-20 bg-black/50 backdrop-blur-md container mx-auto rounded-lg">
            <h2 className="text-3xl font-bold glitch-text">404: Content Not Found</h2>
            <p className="text-muted mt-2">
              {keyword ? `The regrets matching "${keyword}" exist only in your memory.` : "The server is probably sleeping. Or broken. Like us."}
            </p>
          </div>
        ) : Object.keys(categories).length > 0 ? (
          Object.keys(categories).map((category) => (
            <MovieRow key={category} title={category} movies={categories[category]} />
          ))
        ) : (
          <MovieRow title="All Disappointments" movies={movies} />
        )}
      </div>
    </div>
  );
}
