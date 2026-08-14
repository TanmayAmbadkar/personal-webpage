import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, ChevronRight, CheckCircle, AlertTriangle, ArrowRight, Zap, Target, Shield, GitMerge, Home } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import SEO from '../components/SEO';

const AutoSpecPage = () => {
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
                title="AutoSpec: Automating Refinement of RL Specifications"
                description="AutoSpec is a framework for automatically refining coarse logical specifications to guide Reinforcement Learning agents."
                keywords="AutoSpec, Reinforcement Learning, Logical Specifications, SpectRL, Robotics, AI"
            />
            <main className="container mx-auto px-6 py-12">
                {/* Main Title and Abstract */}
                <section className="text-center py-16 px-8 md:px-12 mb-12 rounded-xl bg-slate-100 dark:bg-slate-800 relative overflow-hidden transition-colors duration-300">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}></div>

                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">AutoSpec</span><span className="sr-only">: Specification Refinement for Reinforcement Learning</span>
                        </h1>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8 max-w-3xl mx-auto px-4">
                            Automating the Refinement of Reinforcement Learning Specifications
                        </h3>

                        <p className="text-base text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-6 px-4">
                            <em>Tanmay Ambadkar, Đorđe Žikelić, Abhinav Verma (Accepted at ICLR 2026)</em>
                        </p>

                        <hr className="my-6 border-slate-300 dark:border-slate-600 w-24 mx-auto" />

                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
                            A novel framework that automatically transforms "coarse" or under-specified logical objectives into refined, guidance-rich specifications, enabling RL agents to master complex tasks where standard methods fail.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4">
                            <a href="https://openreview.net/forum?id=VlBw4Oq0K1" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30" rel="noopener noreferrer" target="_blank">
                                <FileText size={18} className="sm:w-5 sm:h-5" />
                                <span>Read Paper</span>
                            </a>
                            <a href="https://github.com/TanmayAmbadkar/gridworld-refinement" className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-slate-500/30" target="_blank" rel="noopener noreferrer">
                                <Github size={20} />
                                <span>View Code</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* The Problem / Introduction */}
                <section className="mb-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="flex-1">
                                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-sm uppercase mb-2 block">The "Specification Gap"</span>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                    Why do concise specifications fail?
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    Reinforcement Learning (RL) has achieved remarkable feats, but specifying <em>what</em> an agent should do is challenging. Manually designing scalar reward functions is an art form, and slight flaws can lead to poor behavior.
                                </p>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    Logical specifications (like "Reach Goal while Avoiding Obstacles") offer a promising, interpretable alternative. However, humans tend to write "coarse" specifications. For example, "Reach the Kitchen" is a valid goal, but if the kitchen is down a winding hallway with trap states (like a staircase), a standard RL agent will struggle to discover the path using only the sparse feedback from the coarse specification.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" />
                                        <p className="text-slate-700 dark:text-slate-300"><strong>Trap States:</strong> Coarse regions may overlap with unrecoverable states.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" />
                                        <p className="text-slate-700 dark:text-slate-300"><strong>Lack of Waypoints:</strong> Long-horizon tasks are difficult without intermediate sub-goals.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" />
                                        <p className="text-slate-700 dark:text-slate-300"><strong>Overly Broad Goals:</strong> Large target regions dilute the learning signal.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm h-fit">
                                <div className="space-y-6">
                                    <h4 className="font-semibold text-slate-900 dark:text-white border-b dark:border-slate-700 pb-2">Specification Refinement Problem</h4>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                                        Given an initial specification $\phi$, we search for a refined specification $\phi_r$ such that:
                                    </p>
                                    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-inner text-center text-lg font-mono text-slate-800 dark:text-slate-200">
                                        {String.raw`$$(\zeta \models \phi_r) \implies (\zeta \models \phi)$$`}
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm italic">
                                        "Satisfaction of the refined spec guarantees satisfaction of the original, but $\phi_r$ is easier to learn."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The AutoSpec Framework */}
                <section className="mb-20 bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                    <div className="text-center mb-10">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider text-sm uppercase">Our Framework</span>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">How AutoSpec Works</h3>
                        <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-3xl mx-auto text-lg">
                            AutoSpec acts as a wrapper around specification-guided RL algorithms. It monitors the learning process to identify <em>why</em> a policy fails and autonomously refines the specification graph.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        <div className="p-4">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Monitor</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Track success rates of edge policies in the abstract specification graph.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Diagnose</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Collect failure and success trajectories when policies underperform.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Refine</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Apply targeted refinement strategies (SeqRefine, AddRefine, PastRefine, OrRefine).</p>
                        </div>
                        <div className="p-4">
                            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Re-train</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Train the policy on the new, easier-to-learn specification.</p>
                        </div>
                    </div>
                </section>

                {/* The Solution: 4 Pillars */}
                <section className="mb-20">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">The Four Pillars of Refinement</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                            AutoSpec employs four targeted procedures to address specific failure modes while maintaining logical soundness.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* SeqRefine */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-blue-500 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">1</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">SeqRefine: Refining Predicates</h4>
                            </div>
                            <div className="mb-4 text-slate-600 dark:text-slate-300 flex-grow">
                                <p className="mb-4"><strong>Problem:</strong> Target region is too broad or contains trap states.</p>
                                <p><strong>Solution:</strong> Automatically tightens the bounds of target regions ($b_r$) and safety constraints ($c_r$) using convex hulls of successful exploration traces. This effectively shrinks the target to exclude "unreachable" or dangerous areas.</p>
                            </div>
                            <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-2 mb-6">
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Removes "unreachable" parts of goal regions.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Identifies and excludes trap states.</li>
                            </ul>
                            <div className="mt-auto bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4 flex items-center justify-center h-48 text-slate-400 dark:text-slate-500 text-sm font-medium italic">
                                Placeholder: SeqRefine Visualization<br />(Trap State Elimination)
                            </div>
                        </div>

                        {/* AddRefine */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">2</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">AddRefine: Adding Waypoints</h4>
                            </div>
                            <div className="mb-4 text-slate-600 dark:text-slate-300 flex-grow">
                                <p className="mb-4"><strong>Problem:</strong> Path is too long for a single policy to learn reliably.</p>
                                <p><strong>Solution:</strong> Decomposes long-horizon tasks by identifying stable "midpoints" in successful trajectories. It splits an edge $u \to v$ into $u \to mid \to v$, creating two shorter, more manageable sub-tasks.</p>
                            </div>
                            <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-2 mb-6">
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Breaks complex paths into learnable segments.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Reduces the effective horizon for the RL agent.</li>
                            </ul>
                            <div className="mt-auto bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4 flex items-center justify-center h-48 text-slate-400 dark:text-slate-500 text-sm font-medium italic">
                                Placeholder: AddRefine Visualization<br />(Waypoint Introduction)
                            </div>
                        </div>

                        {/* PastRefine */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-purple-500 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl">3</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">PastRefine: Source Partitioning</h4>
                            </div>
                            <div className="mb-4 text-slate-600 dark:text-slate-300 flex-grow">
                                <p className="mb-4"><strong>Problem:</strong> Some start states in a region are doomed to fail due to dynamics or obstacles.</p>
                                <p><strong>Solution:</strong> Learns a separating hyperplane (via SVM) between initial states that lead to success and those that fail. It creates a new node for the "good" starts, focusing learning only where success is possible.</p>
                            </div>
                            <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-2 mb-6">
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Focuses learning on viable starting conditions.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Improves reliability in stochastic environments.</li>
                            </ul>
                            <div className="mt-auto bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4 flex items-center justify-center h-48 text-slate-400 dark:text-slate-500 text-sm font-medium italic">
                                Placeholder: PastRefine Visualization<br />(Source Partitioning)
                            </div>
                        </div>

                        {/* OrRefine */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-t-4 border-pink-500 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-xl">4</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">OrRefine: Alternative Paths</h4>
                            </div>
                            <div className="mb-4 text-slate-600 dark:text-slate-300 flex-grow">
                                <p className="mb-4"><strong>Problem:</strong> The direct path is blocked or infeasible.</p>
                                <p><strong>Solution:</strong> Discovers blocked paths and automatically wires new edges to alternative parent nodes in the specification graph. This enables the agent to backtrack or take entirely different routes (e.g., Path B instead of Path A).</p>
                            </div>
                            <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-2 mb-6">
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Enables dynamic routing around obstacles.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> Handles complex topology changes.</li>
                            </ul>
                            <div className="mt-auto bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4 flex items-center justify-center h-48 text-slate-400 dark:text-slate-500 text-sm font-medium italic">
                                Placeholder: OrRefine Visualization<br />(Alternative Path Discovery)
                            </div>
                        </div>
                    </div>
                </section>

                {/* Randomized Experiment Section */}
                <section className="mb-20">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 md:p-12 transition-colors duration-300">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Scalability in Randomized Environments</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    We evaluated AutoSpec on a challenging "100-Rooms" domain where wall configurations and predicate locations were fully randomized for each seed.
                                </p>
                                <h4 className="font-bold text-slate-800 dark:text-white mb-2">The "Bridge" Bottleneck</h4>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    In 80% of random seeds, agents got stuck at narrow passages ("bridges") between key regions. Standard methods (like DiRL) often plateau at 20% success rates due to these bottlenecks. AutoSpec autonomously identifies them and deploys targeted refinements (mostly AddRefine and ReachRefine) to boost success rates to <strong>over 90%</strong>.
                                </p>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-4 flex items-center justify-center h-80 text-slate-400 dark:text-slate-500 text-lg font-medium italic">
                                Placeholder: 100-Room Randomized Experiment<br />(Success Probability Comparison Curve)
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Preview */}
                <section className="bg-slate-900 text-white py-20 rounded-3xl relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h3 className="text-3xl font-bold mb-8">Demonstrated Impact</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6">
                                <div className="text-5xl font-bold text-blue-400 mb-2">90%</div>
                                <div className="text-lg font-semibold mb-2">Success Rate</div>
                                <p className="text-slate-400 text-sm">Achieved on "Bridge" bottlenecks in randomized 100-Room environments (vs &lt; 20% baseline).</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl font-bold text-green-400 mb-2">4x</div>
                                <div className="text-lg font-semibold mb-2">Throughput</div>
                                <p className="text-slate-400 text-sm">Improvement in task completion for high-dimensional robotic manipulation (PandaGym).</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl font-bold text-purple-400 mb-2">100%</div>
                                <div className="text-lg font-semibold mb-2">Automated</div>
                                <p className="text-slate-400 text-sm">No manual reward engineering or hand-crafted heuristics required.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Navigation */}
                <section className="mt-20 flex justify-between items-center text-slate-500 text-sm">
                    <Link to="/ramps" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <ChevronRight className="rotate-180" size={16} />
                        Previous: RAMPS
                    </Link>
                    <span>© 2026 AutoSpec Project</span>
                </section>
            </main>
        </div>
    );
};

export default AutoSpecPage;
