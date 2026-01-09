'use client';

import { useState, useEffect } from 'react';

export default function Settings() {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const isLightMode = localStorage.getItem('theme') === 'light';
        setIsLight(isLightMode);
        if (isLightMode) {
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isLight;
        setIsLight(newMode);
        if (newMode) {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Settings</h1>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Flashbang Mode (Light Theme)</h2>
                        <p className="text-muted text-sm">Enable this if you hate your eyes.</p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`w-14 h-8 rounded-full transition-colors relative ${isLight ? 'bg-accent' : 'bg-gray-700'}`}
                    >
                        <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${isLight ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>

                <div className="border-t border-white/10 pt-8">
                    <h2 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h2>
                    <button className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10 transition-colors">
                        Reset All Regrets (Clear History)
                    </button>
                </div>
            </div>
        </div>
    );
}
