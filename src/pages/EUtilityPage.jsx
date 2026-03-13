import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Home } from 'lucide-react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import SEO from '../components/SEO';
import ThemeToggle from '../components/ThemeToggle';

const EUtilityPage = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            renderMathInElement(contentRef.current, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ],
                throwOnError: false
            });
        }
    }, []);

    return (
        <div className="font-sans bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 min-h-screen transition-colors duration-300" ref={contentRef}>
            <div className="fixed top-4 right-4 z-[200] flex items-center gap-2 sm:gap-3">
                <Link
                    to="/"
                    className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
                    title="Back to Portfolio"
                >
                    <Home size={18} className="sm:w-5 sm:h-5" />
                </Link>
                <ThemeToggle />
            </div>
            <SEO
                title="Optimizing Expected Utility in Multi Objective Reinforcement Learning"
                description="This paper revisits expected scalarized return (ESR) as the correct objective for MORL with non-linear preferences and proposes an ESR-aware policy gradient framework."
                keywords="MORL, Expected Utility, ESR, Policy Gradient, Reinforcement Learning"
            />
            <main className="container mx-auto px-6 py-12">
                {/* Main Title and Abstract */}
                <section className="text-center py-16 px-8 md:px-12 mb-12 rounded-xl bg-slate-100 dark:bg-slate-800 relative overflow-hidden transition-colors duration-300">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">ESR-Aware Policy Gradient</span>
                        </h2>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8 max-w-4xl mx-auto px-4">
                            Optimizing Expected Utility in Multi Objective Reinforcement Learning
                        </h3>
                        <p className="text-base text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-6 px-4">
                            <em>Tanmay Ambadkar, Raghav Kumar, Sourav Panda, Shreyash Kale, Jonathan Dodge, Abhinav Verma</em>
                        </p>
                        <hr className="my-6 border-slate-300 dark:border-slate-600 w-24 mx-auto" />
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 px-4">
                            Standard actor critic methods optimize the wrong objective for non linear preferences; We propose an ESR aware policy gradient method with state augmentation and counterfactual reuse.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                            <button disabled className="inline-flex items-center justify-center gap-2 bg-slate-400 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg cursor-not-allowed shadow-lg">
                                <FileText size={18} className="sm:w-5 sm:h-5" />
                                <span>Paper Coming Soon</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Abstract Section */}
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 mb-12">
                    <h4 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b dark:border-slate-700 pb-2">Abstract</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        In multi objective reinforcement learning with non linear preferences, the choice of optimization criterion is critical. While prior work has distinguished between scalarized expected return and expected scalarized return, most practical deep reinforcement learning algorithms implicitly optimize the former due to reliance on bootstrapped value estimates. This mismatch leads to policies that optimize average outcomes while ignoring correlations, variance, and joint success that matter in single deployment settings. We revisit expected scalarized return as the correct objective for such problems and analyze why standard actor critic methods are structurally misaligned with it. Building on this analysis, we propose an ESR aware policy gradient framework that restores Markov structure via state augmentation, evaluates utility on realized trajectory returns, and separates linear return estimation from non linear utility evaluation. To address the sample inefficiency of optimizing multiple utilities, we further introduce a counterfactual reuse mechanism that safely updates multiple task specific policies from shared experience. Empirical results demonstrate that the proposed approach recovers behaviors aligned with expected utility in settings where scalarized expected return fails, while remaining practical in multi utility environments.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-800 border-t dark:border-slate-700 transition-colors duration-300">
                <div className="container mx-auto px-6 py-6 text-center text-slate-600 dark:text-slate-400">
                    <p>&copy; 2026 Tanmay Ambadkar. ICML 2026 Conference Submission.</p>
                </div>
            </footer>
        </div >
    );
};

export default EUtilityPage;
