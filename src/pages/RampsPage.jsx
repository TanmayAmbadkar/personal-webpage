import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, BookOpen } from 'lucide-react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import SEO from '../components/SEO';

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
        <div className="font-sans bg-slate-50 text-slate-700 min-h-screen" ref={contentRef}>
            <SEO
                title="RAMPS: Robust Adaptive Multi-Step Predictive Shielding"
                description="RAMPS is a scalable shielding framework for safe reinforcement learning in high-dimensional, nonlinear systems."
                keywords="RAMPS, Safe RL, Control Barrier Functions, Reinforcement Learning, Shielding"
            />
            <main className="container mx-auto px-6 py-12">
                {/* Main Title and Abstract */}
                <section className="text-center py-16 mb-12 rounded-xl bg-slate-100" style={{
                    backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                        Robust Adaptive Multi-Step Predictive Shielding
                    </h2>
                    <p className="text-base text-slate-600 max-w-4xl mx-auto">
                        <em>Tanmay Ambadkar, Darshan Chudiwal, Greg Anderson, Abhinav Verma</em>
                    </p>
                    <hr className="my-4 border-slate-300" />
                    <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                        A scalable framework for ensuring safety in deep reinforcement learning, enabling agents to learn high-performing, safe policies in complex, high-dimensional environments.
                    </p>

                    <div className="mt-8 flex justify-center space-x-4">
                        <a href="https://openreview.net/forum?id=2bbqHOWFTU" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105" rel="noopener noreferrer" target="_blank">
                            <FileText size={20} />
                            <span>Paper</span>
                        </a>
                        <a href="https://github.com/TanmayAmbadkar/sparkd" className="inline-flex items-center gap-2 bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-900 transition-transform duration-300 hover:scale-105" rel="noopener noreferrer" target="_blank">
                            <Github size={20} />
                            <span>Github</span>
                        </a>
                        <Link to="/ramps/blog" className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-transform duration-300 hover:scale-105">
                            <BookOpen size={20} />
                            <span>Deep Dive Blog</span>
                        </Link>
                    </div>
                </section>

                {/* The Challenge Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">The Challenge: Safe Exploration in Complex Worlds</h3>
                        <div>
                            <div>
                                <p className="mb-4">
                                    Deep Reinforcement Learning (RL) has shown incredible promise, but its application in safety-critical domains like autonomous driving and robotics is limited. A major hurdle is ensuring the agent acts safely not just after training, but <strong className="text-blue-600">throughout the entire learning process.</strong>
                                </p>
                                <p className="mb-4">
                                    Existing "shielding" methods that provide formal safety guarantees often struggle to scale. They typically rely on building a patchwork of simple, local models of the environment. This approach becomes computationally intractable in the complex, high-dimensional, and nonlinear systems where deep RL truly shines.
                                </p>
                                <p>This creates a critical trade-off: either accept weaker safety guarantees or be confined to simpler problems. How can we achieve provable safety in a way that is both scalable and efficient?</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Solution Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">Our Solution: RAMPS</h3>
                        <p className="text-lg text-center text-slate-600 max-w-3xl mx-auto mb-10">
                            RAMPS bridges this gap by unifying robust control theory with modern machine learning. It provides strong, real-time safety guarantees without sacrificing performance or scalability.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="bg-slate-100 p-6 rounded-lg">
                                <h4 className="text-xl font-semibold mb-2 text-slate-800">Learned Linear Dynamics</h4>
                                <p className="text-slate-600">RAMPS learns a <strong className="text-blue-600">single, global linear representation</strong> of the system's dynamics, using methods like a Deep Koopman Operator.</p>
                            </div>
                            <div className="bg-slate-100 p-6 rounded-lg">
                                <h4 className="text-xl font-semibold mb-2 text-slate-800">Robust Multi-Step Shielding</h4>
                                <p className="text-slate-600">A robust Control Barrier Function (CBF) <strong className="text-blue-600">looks ahead in time</strong>, accounting for model errors to prevent future safety violations.</p>
                            </div>
                            <div className="bg-slate-100 p-6 rounded-lg">
                                <h4 className="text-xl font-semibold mb-2 text-slate-800">Minimally Invasive Action</h4>
                                <p className="text-slate-600">The shield finds the <strong className="text-blue-600">closest possible safe action</strong>, allowing the agent to learn effectively without being overly restricted.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Theoretical Foundations Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">Theoretical Foundations</h3>
                        <p className="text-lg text-center text-slate-600 max-w-3xl mx-auto mb-10">
                            RAMPS is built on a solid theoretical footing, combining a linear dynamics model with a novel robust control barrier function to provide formal safety guarantees.
                        </p>
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Left Column: Key Formulas */}
                            <div>
                                <h4 className="text-2xl font-semibold mb-4 text-slate-800">Key Formulas</h4>
                                <div className="space-y-6">
                                    <div>
                                        <h5 className="font-semibold text-slate-700">1. Learned Linear Dynamics</h5>
                                        <p className="text-slate-600 mb-2">The system dynamics are approximated by a linear model in a (potentially lifted) state space `z`:</p>
                                        <div className="p-4 bg-slate-100 rounded-lg text-center text-sm overflow-x-auto">
                                            {String.raw`$$z_{k+1} = Az_{k} + Bu_{k} + c + w_{k}$$`}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">Where \(w_k\) is the model error, bounded by \(\epsilon\).</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-slate-700">2. Multi-Step Robust Safety Condition</h5>
                                        <p className="text-slate-600 mb-2">To ensure safety over a future horizon \(j\), this condition must hold for each face \(i\) of the safe set:</p>
                                        <div className="p-4 bg-slate-100 rounded-lg text-center text-sm overflow-x-auto">
                                            {String.raw`$$p_{i}^{\top}z_{j}(z,u) + b_{i} \le \lambda^{j}(p_{i}^{\top}z+b_{i}) - \mathcal{E}_{j}(p_{i})$$`}
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-slate-700">3. Robust Tightening Term</h5>
                                        <p className="text-slate-600 mb-2">This term accounts for the accumulated model error over \(j\) steps, ensuring robustness:</p>
                                        <div className="p-4 bg-slate-100 rounded-lg text-center text-sm overflow-x-auto">
                                            {String.raw`$$\mathcal{E}_{j}(p_{i}) = \sum_{k=0}^{j-1}\epsilon||p_{i}^{\top}A^{k}||_{1}$$`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column: Safety Guarantees */}
                            <div>
                                <h4 className="text-2xl font-semibold mb-4 text-slate-800">Safety Guarantees</h4>
                                <div className="space-y-6">
                                    <div className="p-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                                        <h5 className="font-semibold text-slate-800">Theorem 1: Model-Relative Forward Invariance</h5>
                                        <p className="text-slate-700">
                                            This theorem provides a <strong className="text-blue-600">deterministic guarantee</strong> of safety relative to the learned model. It states that if the multi-step safety problem is always solvable and the true model error \(w_k\) stays within its estimated bound \(\epsilon\), the system will <strong className="text-blue-600">never leave the safe set.</strong>
                                        </p>
                                    </div>
                                    <div className="p-6 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                                        <h5 className="font-semibold text-slate-800">Theorem 2: High-Probability Model Accuracy</h5>
                                        <p className="text-slate-700">
                                            This theorem connects the model-based guarantee to the real world. It provides a <strong className="text-green-600">high-probability bound</strong> on how often the true model error might exceed our empirical estimate \(\epsilon\). This ensures that the safety guarantees from Theorem 1 hold with high confidence in practice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">Key Results: A New State-of-the-Art in Safety</h3>
                        <p className="text-lg text-center max-w-3xl mx-auto mb-10 text-slate-600">
                            Across a suite of challenging high-dimensional control environments, RAMPS significantly outperforms existing methods in both safety and performance.
                        </p>

                        <div className="space-y-8">
                            {/* Row 1: Safety Violations */}
                            <div>
                                <h4 className="text-xl font-semibold mb-4 text-slate-800 text-center">Cumulative Safety Violations</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Humanoid */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/Violations_humanoid.png" alt="Humanoid Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(a) Humanoid</p>
                                    </div>
                                    {/* Cheetah */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/Violations_cheetah.png" alt="Cheetah Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(b) Cheetah</p>
                                    </div>
                                    {/* Hopper */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/Violations_hopper.png" alt="Hopper Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(c) Hopper</p>
                                    </div>
                                    {/* Ant */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/Violations_ant.png" alt="Ant Violations Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(d) Ant</p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Reward */}
                            <div>
                                <h4 className="text-xl font-semibold mb-4 text-slate-800 text-center">Reward Curves</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Humanoid */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/reward_humanoid.png" alt="Humanoid Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(a) Humanoid</p>
                                    </div>
                                    {/* Cheetah */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/reward_cheetah.png" alt="Cheetah Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(b) Cheetah</p>
                                    </div>
                                    {/* Hopper */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/reward_hopper.png" alt="Hopper Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(c) Hopper</p>
                                    </div>
                                    {/* Ant */}
                                    <div className="text-center bg-slate-100 p-2 rounded-lg">
                                        <img src="/images/RAMPS/reward_ant.png" alt="Ant Reward Graph" className="rounded-lg shadow-md w-full" />
                                        <p className="mt-2 font-semibold text-slate-700">(d) Ant</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            <div className="border-t-4 border-blue-500 pt-4">
                                <p className="text-4xl font-bold text-blue-600">Up to 90%</p>
                                <p className="text-slate-600">Reduction in safety violations compared to state-of-the-art safe RL methods.</p>
                            </div>
                            <div className="border-t-4 border-blue-500 pt-4">
                                <p className="text-4xl font-bold text-blue-600">100+</p>
                                <p className="text-slate-600">Successfully scales to environments with over 100 state dimensions (e.g., SafeAnt).</p>
                            </div>
                            <div className="border-t-4 border-blue-500 pt-4">
                                <p className="text-4xl font-bold text-blue-600">&lt;0.5 ms</p>
                                <p className="text-slate-600">Average per-step shield computation time, making it feasible for real-time control.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t">
                <div className="container mx-auto px-6 py-6 text-center text-slate-600">
                    <p>&copy; 2026 Anonymous Authors. Paper under double-blind review for ICLR 2026.</p>
                </div>
            </footer>
        </div>
    );
};

export default RampsPage;
