import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, BookOpen } from 'lucide-react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import SEO from '../components/SEO';
import ThemeToggle from '../components/ThemeToggle';

const RampsPage = () => {
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
            <div className="fixed top-4 right-4 z-[200]">
                <ThemeToggle />
            </div>
            <SEO
                title="RAMPS: Robust Adaptive Multi-Step Predictive Shielding"
                description="RAMPS is a scalable shielding framework for safe reinforcement learning in high-dimensional, nonlinear systems."
                keywords="RAMPS, Safe RL, Control Barrier Functions, Reinforcement Learning, Shielding"
            />
            <main className="container mx-auto px-6 py-12">
                {/* Main Title and Abstract */}
                <section className="text-center py-16 mb-12 rounded-xl bg-slate-100 dark:bg-slate-800 relative overflow-hidden transition-colors duration-300">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">RAMPS</span>
                        </h2>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8 max-w-3xl mx-auto">
                            Robust Adaptive Multi-Step Predictive Shielding
                        </h3>
                        <p className="text-base text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                            <em>Tanmay Ambadkar, Darshan Chudiwal, Greg Anderson, Abhinav Verma (Accepted at ICLR 2026)</em>
                        </p>
                        <hr className="my-4 border-slate-300 dark:border-slate-600" />
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                            A scalable framework for ensuring safety in deep reinforcement learning, enabling agents to learn high-performing, safe policies in complex, high-dimensional environments.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                            <a href="https://openreview.net/forum?id=2bbqHOWFTU" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30" rel="noopener noreferrer" target="_blank">
                                <FileText size={20} />
                                <span>Read Paper</span>
                            </a>
                            <a href="https://github.com/TanmayAmbadkar/sparkd" className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold px-8 py-3 rounded-lg hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-slate-500/30" rel="noopener noreferrer" target="_blank">
                                <Github size={20} />
                                <span>View Code</span>
                            </a>
                            <Link to="/ramps/blog" className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
                                <BookOpen size={20} />
                                <span>Deep Dive Blog</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* The Challenge Section */}
                <section className="mb-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="flex-1">
                                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-sm uppercase mb-2 block">The "Safety Gap"</span>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                    Safe Exploration in Complex Worlds
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    Deep Reinforcement Learning (RL) has shown incredible promise, but its application in safety-critical domains like autonomous driving and robotics is limited. A major hurdle is ensuring the agent acts safely not just after training, but <strong className="text-blue-600 dark:text-blue-400">throughout the entire learning process.</strong>
                                </p>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    Existing "shielding" methods often rely on simple, local models that become intractable in high-dimensional, nonlinear systems. This creates a critical trade-off: either accept weaker safety guarantees or be confined to simpler problems.
                                </p>
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm h-fit">
                                <div className="space-y-6">
                                    <h4 className="font-semibold text-slate-900 dark:text-white border-b dark:border-slate-700 pb-2">Safe Exploration Problem</h4>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                                        We seek a policy $\pi$ that maximizes reward while maintaining safety violations below a threshold $\delta$ at all times:
                                    </p>
                                    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-inner text-center text-lg font-mono text-slate-800 dark:text-slate-200">
                                        {String.raw`$$\text{Pr}(s_t \in \mathcal{C}_{safe}) \ge 1 - \delta \quad \forall t$$`}
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm italic">
                                        "Scalable safety requires global shielding without local computational bottlenecks."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Solution Section */}
                <section className="mb-20 bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                    <div className="text-center mb-10">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider text-sm uppercase">Our Framework</span>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">How RAMPS Works</h3>
                        <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-3xl mx-auto text-lg">
                            RAMPS enables scalable safety by unifying robust control theory with modern representation learning.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-4">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Learned Linear Dynamics</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Learns a <strong className="text-blue-600 dark:text-blue-400">global linear representation</strong> using Deep Koopman Operators.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Robust Multi-Step Shielding</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">A robust Control Barrier Function (CBF) looks ahead to account for model errors.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Minimally Invasive</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Projects controls to the closest safe action only when absolutely necessary.</p>
                        </div>
                    </div>
                </section>

                {/* Theoretical Foundations Section */}
                <section className="mb-20">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Theoretical Foundations</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                            RAMPS provides deterministic safety guarantees relative to the learned model, and high-probability guarantees for the real system.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Key Formulas */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">1</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Key Formulas</h4>
                            </div>
                            <div className="mb-4 text-slate-600 dark:text-slate-300 flex-grow space-y-4">
                                <div>
                                    <h5 className="font-semibold text-sm mb-1">Learned Linear Dynamics</h5>
                                    <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded text-center text-xs overflow-x-auto">
                                        {String.raw`$$z_{k+1} = Az_{k} + Bu_{k} + c + w_{k}$$`}
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-sm mb-1">Robust Safety Condition</h5>
                                    <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded text-center text-xs overflow-x-auto">
                                        {String.raw`$$p_{i}^{\top}z_{j} + b_{i} \le \lambda^{j}(p_{i}^{\top}z+b_{i}) - \mathcal{E}_{j}$$`}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        Where {String.raw`$\mathcal{E}_{j}(p_i) = \sum_{k=0}^{j-1} \epsilon\|p_i^\top A^k\|_1$`} is the <strong>robust tightening term</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Safety Guarantees */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-green-500 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl">2</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Formal Guarantees</h4>
                            </div>
                            <div className="mb-4 text-slate-600 dark:text-slate-300 flex-grow space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border-l-4 border-blue-500">
                                    <h5 className="font-bold text-slate-800 dark:text-white text-sm">Theorem 1: Conditional Forward Invariance</h5>
                                    <p className="text-xs mt-1">If the robust QP is feasible at $t=0$ and error is bounded, the system <strong className="text-blue-600 dark:text-blue-400">remains feasible and safe forever</strong> (Corollary: Feasibility Persistence).</p>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border-l-4 border-green-500">
                                    <h5 className="font-bold text-slate-800 dark:text-white text-sm">Theorem 2: High-Probability Safety</h5>
                                    <p className="text-xs mt-1">Provides a <strong className="text-green-600 dark:text-green-400">high-probability bound</strong> on real-world safety violations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Results Section */}
                <section className="mb-20">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 md:p-12 transition-colors duration-300">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">State-of-the-Art Results</h3>
                        <div className="mb-8 text-center max-w-3xl mx-auto">
                            <p className="text-slate-600 dark:text-slate-300">
                                RAMPS maintains extremely low infeasibility rates (<strong>&lt; 2%</strong> generally), with <strong>0% infeasibility</strong> observed even in complex tasks like Humanoid.
                            </p>
                        </div>
                        <div className="space-y-12">
                            {/* Row 1: Safety Violations */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">Cumulative Safety Violations (Lower is Better)</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Humanoid */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/Violations_humanoid.png" alt="Humanoid Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Humanoid</p>
                                    </div>
                                    {/* Cheetah */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/Violations_cheetah.png" alt="Cheetah Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Cheetah</p>
                                    </div>
                                    {/* Hopper */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/Violations_hopper.png" alt="Hopper Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Hopper</p>
                                    </div>
                                    {/* Ant */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/Violations_ant.png" alt="Ant Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Ant</p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Reward */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">Reward Curves (Higher is Better)</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Humanoid */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/reward_humanoid.png" alt="Humanoid Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Humanoid</p>
                                    </div>
                                    {/* Cheetah */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/reward_cheetah.png" alt="Cheetah Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Cheetah</p>
                                    </div>
                                    {/* Hopper */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/reward_hopper.png" alt="Hopper Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Hopper</p>
                                    </div>
                                    {/* Ant */}
                                    <div className="text-center bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                                        <img src="/images/RAMPS/reward_ant.png" alt="Ant Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Ant</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="bg-slate-900 text-white py-20 rounded-3xl relative overflow-hidden mb-12">
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h3 className="text-3xl font-bold mb-8">Demonstrated Impact</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6">
                                <div className="text-5xl font-bold text-blue-400 mb-2">90%</div>
                                <div className="text-lg font-semibold mb-2">Safety Improvement</div>
                                <p className="text-slate-400 text-sm">Reduction in violations compared to state-of-the-art safe RL methods.</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl font-bold text-green-400 mb-2">300+</div>
                                <div className="text-lg font-semibold mb-2">Dimensions</div>
                                <p className="text-slate-400 text-sm">Scales to high-dimensional environments (e.g., SafeAnt) and <strong>21-dimensional constraints</strong>.</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl font-bold text-purple-400 mb-2">&lt;0.5ms</div>
                                <div className="text-lg font-semibold mb-2">Latency</div>
                                <p className="text-slate-400 text-sm">Per-step shield computation time, enabling real-time control.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-800 border-t dark:border-slate-700 transition-colors duration-300">
                <div className="container mx-auto px-6 py-6 text-center text-slate-600 dark:text-slate-400">
                    <p>&copy; Paper accepted at ICLR 2026.</p>
                </div>
            </footer>
        </div>
    );
};

export default RampsPage;
