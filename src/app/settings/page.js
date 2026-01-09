'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor, Volume2, EyeOff, Zap } from 'lucide-react';

export default function Settings() {
    const [theme, setTheme] = useState('dark');
    const [glitchIntensity, setGlitchIntensity] = useState(50);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        // Default to dark if no class
        if (document.documentElement.classList.contains('light')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }, []);

    const toggleTheme = (mode) => {
        setTheme(mode);
        const root = document.documentElement;
        if (mode === 'light') {
            root.classList.add('light');
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
            root.classList.remove('light');
        }
        localStorage.setItem('theme', mode);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 glitch-text">Confession Booth</h1>
            <p className="text-muted mb-12">Configure how you want to waste your time.</p>

            <div className="space-y-8">

                {/* Theme Section */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6">
                        <Monitor className="w-6 h-6 text-accent" />
                        <h2 className="text-xl font-bold">Visual Torture</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => toggleTheme('dark')}
                            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${theme === 'dark' ? 'bg-accent border-accent text-white' : 'bg-black/20 border-white/10 hover:border-white/30'}`}
                        >
                            <div className="flex items-center gap-3">
                                <Moon className="w-5 h-5" />
                                <span className="font-bold">The Void (Dark)</span>
                            </div>
                            {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                        </button>

                        <button
                            onClick={() => toggleTheme('light')}
                            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${theme === 'light' ? 'bg-white text-black border-white' : 'bg-black/20 border-white/10 hover:border-white/30'}`}
                        >
                            <div className="flex items-center gap-3">
                                <Sun className="w-5 h-5" />
                                <span className="font-bold">Flashbang (Light)</span>
                            </div>
                            {theme === 'light' && <div className="w-2 h-2 rounded-full bg-black animate-pulse" />}
                        </button>
                    </div>
                </section>

                {/* Other Sarcastic Settings */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-xl font-bold">Annoyance Levels</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold">Glitch Intensity</h3>
                                <p className="text-xs text-muted">How much should the UI hurt your eyes?</p>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={glitchIntensity}
                                onChange={(e) => setGlitchIntensity(e.target.value)}
                                className="w-40 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${autoplay ? 'bg-accent' : 'bg-white/10'}`} onClick={() => setAutoplay(!autoplay)}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${autoplay ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Auto-play Regrets</h3>
                                    <p className="text-xs text-muted">Start wasting time immediately.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between opacity-50 pointer-events-none">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-6 rounded-full bg-white/10 p-1">
                                    <div className="w-4 h-4 rounded-full bg-white/50" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Productivity Mode</h3>
                                    <p className="text-xs text-muted">This feature is permanently broken.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}
