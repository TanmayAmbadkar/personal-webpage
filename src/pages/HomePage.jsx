import React from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Research from '../components/Research';
import Publications from '../components/Publications';
import Education from '../components/Education';
import Experience from '../components/Experience';
import TeachingExperience from '../components/TeachingExperience';
import SEO from '../components/SEO';

function HomePage() {
    return (
        <div className="min-h-screen text-text font-sans overflow-x-hidden transition-colors duration-300 relative bg-primary">
            <SEO
                title="Tanmay Ambadkar | Reinforcement Learning"
                description="Personal portfolio of Tanmay Ambadkar, a PhD student at Penn State University specializing in Safe Reinforcement Learning, Formal Methods, and Multi-Objective RL. exploring projects like RAMPS, AutoSpec, and D3PO."
                keywords="Tanmay Ambadkar, Reinforcement Learning, Safe RL, Multi-Objective RL, Formal Methods, Robust Adaptive Multi-Step Predictive Shielding, RAMPS, AutoSpec, SpectRL, D3PO, Multi-Objective Reinforcement Learning, Preference Conditioned RL, Deep Koopman Operators, Control Barrier Functions, CBF, Sinergym, Building Control, StarCraft II Benchmark, MIXTAPE, Explainable AI, XAI, Penn State, PhD, Portfolio"
            />
            <Sidebar />

            <main className="lg:ml-64 relative z-10 pt-16 lg:pt-0 transition-all duration-300">
                <div className="relative">
                    <Hero />
                    <Research />
                    <Publications />
                    <Experience />
                    <Education />
                    <TeachingExperience />
                </div>

                <footer className="py-8 text-center text-muted text-sm mt-12 px-4 relative">
                    <p>Designed & Built by Tanmay Ambadkar</p>
                    <p className="mt-2 text-xs opacity-50">Copyright {new Date().getFullYear()} All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
}

export default HomePage;
