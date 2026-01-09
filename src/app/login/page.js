'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth(); // Use Context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

        try {
            const res = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data); // Use context login function
            } else {
                setError(data.message || 'Failed to login');
            }
        } catch (err) {
            setError('Something went wrong. Just like your life choices.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-md p-8 bg-black/60 border border-white/10 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-bold mb-2 text-center glitch-text">Welcome Back</h1>
                <p className="text-muted text-center mb-8">Ready to lower your productivity?</p>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-center text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                            placeholder="user@procrastination.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-accent text-white font-bold rounded hover:bg-red-700 transition-colors uppercase tracking-wider"
                    >
                        Start Wasting Time
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted">
                    New here?{' '}
                    <Link href="/register" className="text-white hover:text-accent underline">
                        Join the Regret
                    </Link>
                </p>
            </div>
        </div>
    );
}
