'use client';

import Link from 'next/link';
import { Search, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Function to check user
        const checkUser = () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
            } else {
                setUser(null);
            }
        };

        // Check on mount
        checkUser();

        // Listen for custom auth event
        window.addEventListener('auth-change', checkUser);

        // Cleanup
        return () => window.removeEventListener('auth-change', checkUser);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.push(`/?keyword=${query}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.dispatchEvent(new Event('auth-change'));
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-transparent absolute w-full z-50">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-accent glitch-text">
                404movies
            </Link>

            <div className="hidden md:flex space-x-8 text-foreground/80 font-medium">
                <Link href="/" className="hover:text-accent transition-colors">
                    Home
                </Link>
                <Link href="/movies" className="hover:text-accent transition-colors">
                    Movies
                </Link>
                <Link href="#" className="hover:text-accent transition-colors">
                    Series
                </Link>
                <Link href="#" className="hover:text-accent transition-colors opacity-50 cursor-not-allowed">
                    Definitely Studying
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden lg:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="bg-black/50 border border-muted/20 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-accent w-48 transition-all"
                    />
                    <Search className="w-4 h-4 absolute right-3 top-2.5 text-muted" />
                </div>

                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline text-sm font-bold text-accent">
                            {user.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="p-2 hover:text-accent transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login">
                            <button className="hidden sm:block px-4 py-1.5 text-sm font-bold text-foreground hover:text-accent transition-colors">
                                Login
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="px-5 py-2 text-sm font-bold bg-accent text-white rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
