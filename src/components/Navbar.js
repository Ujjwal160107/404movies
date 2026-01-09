'use client';

import Link from 'next/link';
import { Search, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.push(`/?keyword=${query}`);
        }
    };

    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto flex items-center justify-between w-full max-w-7xl px-6 py-3 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-300">
                <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-accent glitch-text hover:scale-105 transition-transform">
                    404movies
                </Link>

                <div className="hidden md:flex space-x-8 text-foreground/80 font-medium text-sm">
                    <Link href="/" className="hover:text-accent transition-colors hover:scale-105 transform">
                        Home
                    </Link>
                    <Link href="/movies" className="hover:text-accent transition-colors hover:scale-105 transform">
                        Movies
                    </Link>
                    <Link href="#" className="hover:text-accent transition-colors opacity-50 cursor-not-allowed">
                        Definitely Studying
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative hidden lg:block group">
                        <input
                            type="text"
                            placeholder="Search regrets..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-accent w-40 focus:w-56 transition-all duration-300 placeholder:text-muted/60"
                        />
                        <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-muted group-hover:text-white transition-colors" />
                    </div>

                    <Link href="/settings" className="p-2 hover:bg-white/5 rounded-full transition-colors group" title="Settings">
                        <Settings className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <span className="hidden md:inline text-xs font-bold text-accent uppercase tracking-widest truncate max-w-[100px]">
                                {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="p-2 mr-[-8px] hover:text-red-500 transition-colors hover:bg-white/5 rounded-full"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 pl-2 md:pl-0">
                            <Link href="/login">
                                <button className="hidden sm:block px-4 py-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors uppercase tracking-wider">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className="px-5 py-2 text-xs font-bold bg-accent text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-900/20 hover:shadow-red-500/30 uppercase tracking-wider">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
