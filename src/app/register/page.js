'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth(); // Use Context (login function serves for both login and immediate auth after register)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

        try {
            const res = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data); // Auto-login after register
            } else {
                setError(data.message || 'Failed to register');
            }
        } catch (err) {
            setError('Registration failed. The universe is sending a sign.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-lg">
                <h1 className="text-3xl font-bold mb-2 text-center text-accent">Join the Club</h1>
                <p className="text-muted text-center mb-8">Productivity is overrated anyway.</p>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-center text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-black border border-white/20 rounded focus:border-accent outline-none" placeholder="Your Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-black border border-white/20 rounded focus:border-accent outline-none" placeholder="email@wasted.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-black border border-white/20 rounded focus:border-accent outline-none" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors">
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted">
                    Already have regrets?{' '}
                    <Link href="/login" className="text-accent hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
