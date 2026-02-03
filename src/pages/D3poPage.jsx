import { Link } from 'react-router-dom';
import { FileText, Github, Home } from 'lucide-react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import SEO from '../components/SEO';
import ThemeToggle from '../components/ThemeToggle';

const D3poPage = () => {
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
                title="D3PO: Decomposed, Diversity-Driven Policy Optimization"
                description="D3PO is a novel algorithm for preference-conditioned multi-objective reinforcement learning that avoids gradient interference and mode collapse."
                keywords="D3PO, Multi-Objective RL, MORL, Reinforcement Learning, Pareto Front"
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
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">D3PO</span>
                        </h2>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8 max-w-4xl mx-auto px-4">
                            Preference Conditioned Multi-Objective Reinforcement Learning
                        </h3>
                        <p className="text-base text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-6 px-4">
                            <em>Tanmay Ambadkar, Sourav Panda, Shreyash Kale, Jonathan Dodge, Abhinav Verma</em>
                        </p>
                        <hr className="my-6 border-slate-300 dark:border-slate-600 w-24 mx-auto" />
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 px-4">
                            A novel algorithm that trains a single, preference-conditioned policy to efficiently discover a diverse and high-quality set of trade-off solutions in multi-objective environments.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                            <a href="https://openreview.net/forum?id=iH7mSOTR4q" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30" rel="noopener noreferrer" target="_blank">
                                <FileText size={18} className="sm:w-5 sm:h-5" />
                                <span>Read Paper</span>
                            </a>
                            <a href="https://github.com/TanmayAmbadkar/reward-decomposition" className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-slate-500/30" rel="noopener noreferrer" target="_blank">
                                <Github size={18} className="sm:w-5 sm:h-5" />
                                <span>View Code</span>
                            </a>
                        </div>

                        {/* Teaser Image in Hero - floated or after buttons */}
                        <div className="mt-12 max-w-4xl mx-auto">
                            <div className="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
                                <img src="/images/D3PO/D3PPO_page-0001.jpg" alt="D³PO Algorithm Overview" className="rounded-lg w-full" />
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 italic">Overview of the D³PO decomposed architecture.</p>
                        </div>
                    </div>
                </section>

                {/* The Challenge Section */}
                <section className="mb-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="flex-1">
                                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-sm uppercase mb-2 block">The Challenge</span>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                    Balancing Conflicting Goals
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    Many real-world problems, from autonomous driving to logistics, require balancing multiple, often conflicting, objectives—like speed versus safety, or cost versus environmental impact.
                                </p>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    Training a single, flexible policy that can adapt to different user preferences is the Holy Grail. However, existing methods often fail due to two critical issues: <strong>Gradient Interference</strong> and <strong>Mode Collapse</strong>.
                                </p>
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm h-fit">
                                <div className="space-y-6">
                                    <h4 className="font-semibold text-slate-900 dark:text-white border-b dark:border-slate-700 pb-2">The Multi-Objective Dilemma</h4>

                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-bold shrink-0">1</div>
                                            <div>
                                                <h5 className="font-bold text-slate-800 dark:text-white text-sm">Destructive Interference</h5>
                                                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Gradients from conflicting objectives cancel each other out, stalling learning.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold shrink-0">2</div>
                                            <div>
                                                <h5 className="font-bold text-slate-800 dark:text-white text-sm">Mode Collapse</h5>
                                                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">The agent ignores diverse preferences and collapses to a single "safe bet" behavior.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 dark:text-slate-400 text-xs italic mt-4 pt-4 border-t dark:border-slate-700">
                                        "How can we learn the full Pareto front with a single neural network?"
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
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">How D3PO Works</h3>
                        <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-3xl mx-auto text-lg">
                            D3PO (Decomposed, Diversity-Driven Policy Optimization) tackles these challenges head-on with a three-pronged approach.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-4">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Decomposed Optimization</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">We compute advantages for each objective <em>independently</em>, preventing signal cancellation before updates.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Late-Stage Weighting</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">User preferences are applied only at the final stage of loss calculation, ensuring stable integration.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Diversity Regularizer</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">A novel loss term forces the policy to produce different behaviors for different preferences.</p>
                        </div>
                    </div>
                </section>

                {/* Theoretical Foundations Section */}
                <section className="mb-20">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Theoretical Foundations</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                            D3PO is grounded in formal analysis that guarantees stable and diverse policy learning.
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
                                    <h5 className="font-semibold text-sm mb-1">Final Actor Objective</h5>
                                    <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded text-center text-xs overflow-x-auto">
                                        {String.raw`$$\mathcal{L}_{actor}(\theta)=-(\sum_{i=1}^{d}\omega_{i}\mathcal{L}_{clip}^{(i)}(\theta))+\lambda_{div}\mathcal{L}_{diversity}(\theta)$$`}
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-sm mb-1">Scaled Diversity Regularizer</h5>
                                    <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded text-center text-xs overflow-x-auto">
                                        {String.raw`$$\mathcal{L}_{diversity}(\theta)=\mathbb{E}_{t}[(D_{KL}(\pi_{\theta}(\cdot|s_{t},\omega)||\pi_{\theta}(\cdot|s_{t},\omega^{\prime}))-\alpha||\omega-\omega^{\prime}||_{1})^{2}]$$`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formal Guarantees */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-green-500 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl">2</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Formal Guarantees</h4>
                            </div>
                            <div className="mb-4 text-slate-600 dark:text-slate-300 flex-grow space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border-l-4 border-blue-500">
                                    <h5 className="font-bold text-slate-800 dark:text-white text-sm">No Advantage Cancellation</h5>
                                    <p className="text-xs mt-1">We prove that decomposing advantages prevents the loss of gradient information when objectives conflict.</p>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border-l-4 border-green-500">
                                    <h5 className="font-bold text-slate-800 dark:text-white text-sm">No Mode Collapse</h5>
                                    <p className="text-xs mt-1">We guarantee that minimizing our objective forces the policy to behave differently for different preferences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="mb-20">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 md:p-12 transition-colors duration-300">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">State-of-the-Art Pareto Front Discovery</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {/* Hopper */}
                            <div className="text-center bg-slate-50 dark:bg-slate-700 p-3 rounded-xl border border-slate-100 dark:border-slate-600">
                                <img src="/images/D3PO/hopper_rewards.png" alt="Hopper Pareto Front" className="rounded-lg shadow-sm w-full" />
                                <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">Hopper-v2</p>
                            </div>
                            {/* Ant */}
                            <div className="text-center bg-slate-50 dark:bg-slate-700 p-3 rounded-xl border border-slate-100 dark:border-slate-600">
                                <img src="/images/D3PO/ant_rewards.png" alt="Ant Pareto Front" className="rounded-lg shadow-sm w-full" />
                                <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">Ant-v2</p>
                            </div>
                            {/* Humanoid */}
                            <div className="text-center bg-slate-50 dark:bg-slate-700 p-3 rounded-xl border border-slate-100 dark:border-slate-600">
                                <img src="/images/D3PO/humanoid_rewards.png" alt="Humanoid Pareto Front" className="rounded-lg shadow-sm w-full" />
                                <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">Humanoid-v2</p>
                            </div>
                        </div>

                        <div className="mb-12 overflow-x-auto bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xl font-bold mb-6 text-slate-800 dark:text-white text-center">Quantitative Comparison (Hypervolume)</h4>
                            <table className="w-full border-collapse text-sm text-left text-slate-700 dark:text-slate-300">
                                <thead>
                                    <tr>
                                        <th className="p-3 border-b-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Environment</th>
                                        <th className="p-3 border-b-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Metrics</th>
                                        <th className="p-3 border-b-2 border-slate-200 dark:border-slate-600 font-semibold">PG-MORL</th>
                                        <th className="p-3 border-b-2 border-slate-200 dark:border-slate-600 font-semibold">GPI-LS</th>
                                        <th className="p-3 border-b-2 border-slate-200 dark:border-slate-600 font-semibold">C-MORL</th>
                                        <th className="p-3 border-b-2 border-slate-200 dark:border-slate-600 font-bold text-blue-600 dark:text-blue-400">D³PO (Ours)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {/* Hopper-2d */}
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                        <td className="p-3 font-semibold" rowSpan="3">Hopper-2d</td>
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">HV ($10^5$)</td>
                                        <td className="p-3">1.20</td>
                                        <td className="p-3">1.19</td>
                                        <td className="p-3 font-bold text-slate-900 dark:text-white">1.37</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">1.30</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">EU ($10^2$)</td>
                                        <td className="p-3">2.34</td>
                                        <td className="p-3">2.33</td>
                                        <td className="p-3 font-bold text-slate-900 dark:text-white">2.53</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">2.47</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">SP ($10^2$) $\downarrow$</td>
                                        <td className="p-3">5.13</td>
                                        <td className="p-3">0.49</td>
                                        <td className="p-3">1.13</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">0.26</td>
                                    </tr>

                                    {/* Hopper-3d */}
                                    <tr>
                                        <td className="p-3 font-semibold" rowSpan="3">Hopper-3d</td>
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">HV ($10^7$)</td>
                                        <td className="p-3">1.59</td>
                                        <td className="p-3">1.70</td>
                                        <td className="p-3 font-bold text-slate-900 dark:text-white">2.19</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">2.12</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">EU ($10^2$)</td>
                                        <td className="p-3">1.47</td>
                                        <td className="p-3">1.62</td>
                                        <td className="p-3 font-bold text-slate-900 dark:text-white">1.81</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">1.74</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">SP ($10^2$) $\downarrow$</td>
                                        <td className="p-3">0.76</td>
                                        <td className="p-3">0.74</td>
                                        <td className="p-3">0.53</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">0.04</td>
                                    </tr>

                                    {/* Ant-2d */}
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                        <td className="p-3 font-semibold" rowSpan="3">Ant-2d</td>
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">HV ($10^5$)</td>
                                        <td className="p-3">0.35</td>
                                        <td className="p-3">1.17</td>
                                        <td className="p-3">1.31</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">1.91</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">EU ($10^2$)</td>
                                        <td className="p-3">0.81</td>
                                        <td className="p-3 font-bold text-slate-900 dark:text-white">4.28</td>
                                        <td className="p-3">2.50</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">3.14</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">SP ($10^3$) $\downarrow$</td>
                                        <td className="p-3">2.20</td>
                                        <td className="p-3">3.61</td>
                                        <td className="p-3">2.65</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">0.66</td>
                                    </tr>

                                    {/* Ant-3d */}
                                    <tr>
                                        <td className="p-3 font-semibold" rowSpan="3">Ant-3d</td>
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">HV ($10^7$)</td>
                                        <td className="p-3">0.94</td>
                                        <td className="p-3">0.55</td>
                                        <td className="p-3">2.61</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">2.68</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">EU ($10^2$)</td>
                                        <td className="p-3">1.07</td>
                                        <td className="p-3 font-bold text-slate-900 dark:text-white">2.41</td>
                                        <td className="p-3">2.06</td>
                                        <td className="p-3 text-slate-700 dark:text-slate-300">1.99</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">SP ($10^3$) $\downarrow$</td>
                                        <td className="p-3">0.02</td>
                                        <td className="p-3">1.96</td>
                                        <td className="p-3">0.06</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">0.004</td>
                                    </tr>

                                    {/* Humanoid-2d */}
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                        <td className="p-3 font-semibold" rowSpan="3">Humanoid-2d</td>
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">HV ($10^5$)</td>
                                        <td className="p-3">2.62</td>
                                        <td className="p-3">1.98</td>
                                        <td className="p-3">3.43</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">3.76</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">EU ($10^2$)</td>
                                        <td className="p-3">4.06</td>
                                        <td className="p-3">3.67</td>
                                        <td className="p-3">4.78</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">5.11</td>
                                    </tr>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                        <td className="p-3 text-xs uppercase tracking-wide text-slate-500">SP ($10^4$) $\downarrow$</td>
                                        <td className="p-3">0.13</td>
                                        <td className="p-3">0*</td>
                                        <td className="p-3">2.21</td>
                                        <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">0.003</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Efficiency and Stats */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Extreme Model Efficiency</h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                                    By learning a single unified policy instead of a population, D3PO reduces memory requirements by orders of magnitude while representing an <strong>unbounded</strong> number of preference solutions.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-slate-700 dark:text-slate-300">
                                        <thead>
                                            <tr className="border-b border-slate-200 dark:border-slate-600">
                                                <th className="py-2">Env</th>
                                                <th className="py-2">D3PO (MB)</th>
                                                <th className="py-2">C-MORL</th>
                                                <th className="py-2">Reduction</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-200 dark:border-slate-700/50">
                                                <td className="py-2 font-medium">Ant-2D</td>
                                                <td className="py-2 font-bold text-green-600 dark:text-green-400">0.089</td>
                                                <td className="py-2">14.385</td>
                                                <td className="py-2 text-xs opacity-70">~160x</td>
                                            </tr>
                                            <tr className="border-b border-slate-200 dark:border-slate-700/50">
                                                <td className="py-2 font-medium">Humanoid</td>
                                                <td className="py-2 font-bold text-green-600 dark:text-green-400">0.212</td>
                                                <td className="py-2">5.060</td>
                                                <td className="py-2 text-xs opacity-70">~24x</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 font-medium">Building-9D</td>
                                                <td className="py-2 font-bold text-green-600 dark:text-green-400">0.064</td>
                                                <td className="py-2">11.608</td>
                                                <td className="py-2 text-xs opacity-70">~180x</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Rigorous Statistical Validation</h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                                    Performance improvements are validated using <strong>one-sided Welch’s t-tests</strong> across 5 seeds. D3PO achieves statistically significant gains ($p &lt; 0.05$) in 12/18 comparisons.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                        <div>
                                            <strong className="text-slate-800 dark:text-white block text-sm">Ant-2d Dominance</strong>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">Significant across all metrics: HV ($p &lt; 0.001$), EU ($p=0.002$), SP ($p &lt; 0.001$).</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></div>
                                        <div>
                                            <strong className="text-slate-800 dark:text-white block text-sm">High-Dim Robustness</strong>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">On Humanoid-2d, D3PO is the only method to avoid collapse, with significant gains in HV ($p=0.002$) and EU ($p &lt; 0.001$).</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="bg-slate-900 text-white py-20 rounded-3xl relative overflow-hidden mb-12">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(#818cf8 1px, transparent 1px)',
                        backgroundSize: '32px 32px'
                    }}></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h3 className="text-3xl font-bold mb-8">Demonstrated Performance</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6">
                                <div className="text-5xl font-bold text-blue-400 mb-2">SOTA</div>
                                <div className="text-lg font-semibold mb-2">Hypervolume</div>
                                <p className="text-slate-400 text-sm">Achieves state-of-the-art Hypervolume on complex continuous control tasks.</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl font-bold text-green-400 mb-2">0</div>
                                <div className="text-lg font-semibold mb-2">Mode Collapse</div>
                                <p className="text-slate-400 text-sm">Provably prevents mode collapse, ensuring diverse solutions.</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl font-bold text-purple-400 mb-2">1</div>
                                <div className="text-lg font-semibold mb-2">Single Policy</div>
                                <p className="text-slate-400 text-sm">Replaces 200+ discrete policies with one unified model, representing the unbounded Pareto front.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-800 border-t dark:border-slate-700 transition-colors duration-300">
                <div className="container mx-auto px-6 py-6 text-center text-slate-600 dark:text-slate-400">
                    <p>&copy; 2026 Anonymous Authors. Paper under double-blind review for ICML 2026.</p>
                </div>
            </footer>
        </div >
    );
};

export default D3poPage;
