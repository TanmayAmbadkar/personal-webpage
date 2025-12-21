import React, { useEffect, useRef } from 'react';
import { FileText, Github } from 'lucide-react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';

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
        <div className="font-sans bg-slate-50 text-slate-700 min-h-screen" ref={contentRef}>
            <main className="container mx-auto px-6 py-12">
                {/* Main Title and Abstract */}
                <section className="text-center py-16 mb-12 rounded-xl bg-slate-100" style={{
                    backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                        Preference Conditioned Multi-Objective Reinforcement Learning: Decomposed, Diversity-Driven Policy Optimization
                    </h2>
                    <p className="text-base text-slate-600 max-w-4xl mx-auto">
                        <em>Tanmay Ambadkar, Sourav Panda, Shreyash Kale, Jonathan Dodge, Abhinav Verma</em>
                    </p>
                    <hr className="my-4 border-slate-300" />
                    <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                        A novel algorithm that trains a single, preference-conditioned policy to efficiently discover a diverse and high-quality set of trade-off solutions in multi-objective environments.
                    </p>

                    {/* Teaser Image */}
                    <div className="mt-10 max-w-5xl mx-auto px-4">
                        <img src="/images/D3PO/D3PPO_page-0001.jpg" alt="D³PO Algorithm Overview" className="rounded-xl shadow-2xl w-full border-4 border-white" />
                        <p className="text-sm text-slate-500 mt-3">Overview of the D³PO algorithm architecture.</p>
                    </div>

                    <div className="mt-10 flex justify-center space-x-4">
                        <a href="https://openreview.net/forum?id=iH7mSOTR4q" className="inline-flex flex-col items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105" rel="noopener noreferrer" target="_blank">
                            <FileText size={24} />
                            {/* <span>View Paper</span> */}
                        </a>
                        <a href="https://github.com/TanmayAmbadkar/reward-decomposition" className="inline-flex flex-col items-center gap-2 bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-900 transition-transform duration-300 hover:scale-105" rel="noopener noreferrer" target="_blank">
                            <Github size={24} />
                            {/* <span>Source Code</span> */}
                        </a>
                    </div>
                </section>

                {/* The Challenge Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">The Challenge: Balancing Conflicting Goals</h3>
                        <div>
                            <div>
                                <p className="mb-4">
                                    Many real-world problems, from autonomous driving to logistics, require balancing multiple, often conflicting, objectives—like speed versus safety, or cost versus environmental impact. This is the domain of Multi-Objective Reinforcement Learning (MORL).
                                </p>
                                <p className="mb-4">
                                    Training a single, flexible policy that can adapt to different user preferences is the most efficient approach. However, existing methods face two major obstacles:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><strong className="text-blue-600">Destructive Gradient Interference:</strong> When objectives conflict, their learning signals can cancel each other out, leading to unstable training and suboptimal policies.</li>
                                    <li><strong className="text-blue-600">Representational Mode Collapse:</strong> The policy often "forgets" how to achieve certain trade-offs, collapsing to a few similar behaviors regardless of the user's preference.</li>
                                </ul>
                                <p>How can we train a single policy that masters the full spectrum of possible solutions without succumbing to these issues?</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Solution Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">Our Solution: D³PO</h3>
                        <p className="text-lg text-center text-slate-600 max-w-3xl mx-auto mb-10">
                            D³PO (Decomposed, Diversity-Driven Policy Optimization) is a new algorithm that directly tackles these core challenges to train a robust, single multi-objective policy.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="bg-slate-100 p-6 rounded-lg">
                                <h4 className="text-2xl font-semibold mb-4 text-slate-800">Decomposed Optimization</h4>
                                <p className="text-slate-600">We compute advantages for each objective independently, preserving their distinct signals to prevent them from destructively interfering with each other during updates.</p>
                            </div>
                            <div className="bg-slate-100 p-6 rounded-lg">
                                <h4 className="text-2xl font-semibold mb-4 text-slate-800">Late-Stage Weighting</h4>
                                <p className="text-slate-600">User preferences (weights) are applied only at the final stage of the loss calculation, after stabilization, ensuring a clean and stable integration of objectives.</p>
                            </div>
                            <div className="bg-slate-100 p-6 rounded-lg">
                                <h4 className="text-2xl font-semibold mb-4 text-slate-800">Scaled Diversity Regularizer</h4>
                                <p className="text-slate-600">A novel loss term explicitly encourages the policy to produce different behaviors for different preferences, directly preventing mode collapse and ensuring full coverage of solutions.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Theoretical Foundations Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 transition-all duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">Theoretical Foundations</h3>
                        <p className="text-lg text-center text-slate-600 max-w-3xl mx-auto mb-10">
                            D³PO's design is grounded in a formal analysis that guarantees more stable and diverse policy learning compared to previous approaches.
                        </p>
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Left Column: Key Formulas */}
                            <div>
                                <h4 className="text-2xl font-semibold mb-4 text-slate-800">Key Formulas</h4>
                                <div className="space-y-6">
                                    <div>
                                        <h5 className="font-semibold text-slate-700">1. Final Actor Objective</h5>
                                        <p className="text-slate-600 mb-2">The final update combines the preference-weighted PPO losses with the diversity regularizer:</p>
                                        <div className="p-4 bg-slate-100 rounded-lg text-center text-sm overflow-x-auto">
                                            {String.raw`$$\mathcal{L}_{actor}(\theta)=-(\sum_{i=1}^{d}\omega_{i}\mathcal{L}_{clip}^{(i)}(\theta))+\lambda_{div}\mathcal{L}_{diversity}(\theta)$$`}
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-slate-700">2. Scaled Diversity Regularizer</h5>
                                        <p className="text-slate-600 mb-2">This loss ensures policy divergence scales with preference divergence to prevent mode collapse:</p>
                                        <div className="p-4 bg-slate-100 rounded-lg text-center text-sm overflow-x-auto">
                                            {String.raw`$$\mathcal{L}_{diversity}(\theta)=\mathbb{E}_{t}[(D_{KL}(\pi_{\theta}(\cdot|s_{t},\omega)||\pi_{\theta}(\cdot|s_{t},\omega^{\prime}))-\alpha||\omega-\omega^{\prime}||_{1})^{2}]$$`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column: Safety Guarantees */}
                            <div>
                                <h4 className="text-2xl font-semibold mb-4 text-slate-800">Formal Guarantees</h4>
                                <div className="space-y-6">
                                    <div className="p-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                                        <h5 className="font-semibold text-slate-800">No Advantage Cancellation</h5>
                                        <p className="text-slate-700">
                                            We prove that scalarizing rewards too early (a common practice) causes "advantage cancellation," where conflicting objective signals are lost. D³PO's <strong className="text-blue-600">decomposed approach avoids this information loss entirely.</strong>
                                        </p>
                                    </div>
                                    <div className="p-6 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                                        <h5 className="font-semibold text-slate-800">No Mode Collapse</h5>
                                        <p className="text-slate-700">
                                            We provide the first formal guarantee against mode collapse in preference-conditioned MORL. We prove that any policy that minimizes our objective <strong className="text-green-600">cannot produce the same behavior for different preferences</strong>, ensuring a diverse Pareto front.
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
                        <h3 className="text-2xl font-semibold mb-4 text-slate-800">Key Results: State-of-the-Art Pareto Front Discovery</h3>
                        <p className="text-lg text-center max-w-3xl mx-auto mb-10 text-slate-600">
                            D³PO discovers more comprehensive and higher-quality Pareto fronts across a range of challenging MORL benchmarks, establishing a new state-of-the-art.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                            {/* Hopper */}
                            <div className="text-center bg-slate-100 p-2 rounded-lg">
                                <img src="/images/D3PO/hopper_rewards.png" alt="Hopper Pareto Front" className="rounded-lg shadow-md w-full" />
                                <p className="mt-2 font-semibold text-slate-700">Hopper</p>
                            </div>
                            {/* Ant */}
                            <div className="text-center bg-slate-100 p-2 rounded-lg">
                                <img src="/images/D3PO/ant_rewards.png" alt="Ant Pareto Front" className="rounded-lg shadow-md w-full" />
                                <p className="mt-2 font-semibold text-slate-700">Ant</p>
                            </div>
                            {/* Humanoid */}
                            <div className="text-center bg-slate-100 p-2 rounded-lg">
                                <img src="/images/D3PO/humanoid_rewards.png" alt="Humanoid Pareto Front" className="rounded-lg shadow-md w-full" />
                                <p className="mt-2 font-semibold text-slate-700">Humanoid</p>
                            </div>
                        </div>

                        <p className="text-center text-slate-600 mb-12">Visual comparison of discovered Pareto fronts. D³PO (red) consistently finds a more uniform and complete set of solutions compared to other leading methods.</p>

                        {/* Continuous Environments Table */}
                        <div className="mb-12 overflow-x-auto">
                            <h4 className="text-2xl font-semibold mb-4 text-slate-800 text-center">Performance on Continuous Environments</h4>
                            <table className="w-full border-collapse text-sm text-left">
                                <thead>
                                    <tr>
                                        <th className="p-3 border-t-2 border-b border-slate-900">Environment</th>
                                        <th className="p-3 border-t-2 border-b border-slate-900">Metrics</th>
                                        <th className="p-3 border-t-2 border-b border-slate-900">PG-MORL</th>
                                        <th className="p-3 border-t-2 border-b border-slate-900">GPI-LS</th>
                                        <th className="p-3 border-t-2 border-b border-slate-900">C-MORL</th>
                                        <th className="p-3 border-t-2 border-b border-slate-900">D³PO</th>
                                    </tr>
                                </thead>
                                <tbody className="border-b-2 border-slate-900">
                                    {/* Hopper-2d */}
                                    <tr>
                                        <td rowSpan="3" className="font-bold p-3">Hopper-2d</td>
                                        <td className="p-3">HV (10⁵ &uarr;)</td>
                                        <td className="p-3">1.20 &plusmn; 0.09</td>
                                        <td className="p-3">1.19 &plusmn; 0.10</td>
                                        <td className="font-bold p-3">1.37 &plusmn; 0.03</td>
                                        <td className="p-3">1.30 &plusmn; 0.03</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">EU (10² &uarr;)</td>
                                        <td className="p-3">2.34 &plusmn; 0.10</td>
                                        <td className="p-3">2.33 &plusmn; 0.10</td>
                                        <td className="font-bold p-3">2.53 &plusmn; 0.02</td>
                                        <td className="p-3">2.47 &plusmn; 0.01</td>
                                    </tr>
                                    <tr className="border-b border-slate-300">
                                        <td className="p-3">SP (10² &darr;)</td>
                                        <td className="p-3">5.13 &plusmn; 5.81</td>
                                        <td className="p-3">0.49 &plusmn; 0.37</td>
                                        <td className="p-3">1.13 &plusmn; 0.19</td>
                                        <td className="font-bold p-3">0.26 &plusmn; 0.31</td>
                                    </tr>
                                    {/* Hopper-3d */}
                                    <tr>
                                        <td rowSpan="3" className="font-bold p-3">Hopper-3d</td>
                                        <td className="p-3">HV (10⁷ &uarr;)</td>
                                        <td className="p-3">1.59 &plusmn; 0.45</td>
                                        <td className="p-3">1.70 &plusmn; 0.29</td>
                                        <td className="font-bold p-3">2.19 &plusmn; 0.32</td>
                                        <td className="p-3">2.12 &plusmn; 0.16</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">EU (10² &uarr;)</td>
                                        <td className="p-3">1.47 &plusmn; 0.25</td>
                                        <td className="p-3">1.62 &plusmn; 0.10</td>
                                        <td className="font-bold p-3">1.81 &plusmn; 0.01</td>
                                        <td className="p-3">1.74 &plusmn; 4.9</td>
                                    </tr>
                                    <tr className="border-b border-slate-300">
                                        <td className="p-3">SP (10² &darr;)</td>
                                        <td className="p-3">0.76 &plusmn; 0.91</td>
                                        <td className="p-3">0.74 &plusmn; 1.22</td>
                                        <td className="p-3">0.53 &plusmn; 0.34</td>
                                        <td className="font-bold p-3">0.04 &plusmn; 0.01</td>
                                    </tr>
                                    {/* Ant-2d */}
                                    <tr>
                                        <td rowSpan="3" className="font-bold p-3">Ant-2d</td>
                                        <td className="p-3">HV (10⁵ &uarr;)</td>
                                        <td className="p-3">0.35 &plusmn; 0.08</td>
                                        <td className="p-3">1.17 &plusmn; 0.25</td>
                                        <td className="p-3">1.31 &plusmn; 0.16</td>
                                        <td className="font-bold p-3">1.91 &plusmn; 0.18</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">EU (10² &uarr;)</td>
                                        <td className="p-3">0.81 &plusmn; 0.23</td>
                                        <td className="p-3">4.28 &plusmn; 0.19</td>
                                        <td className="p-3">2.50 &plusmn; 0.25</td>
                                        <td className="font-bold p-3">3.14 &plusmn; 0.21</td>
                                    </tr>
                                    <tr className="border-b border-slate-300">
                                        <td className="p-3">SP (10³ &darr;)</td>
                                        <td className="p-3">2.20 &plusmn; 3.48</td>
                                        <td className="p-3">3.61 &plusmn; 2.13</td>
                                        <td className="p-3">2.65 &plusmn; 1.25</td>
                                        <td className="p-3">0.66 &plusmn; 0.40</td>
                                    </tr>
                                    {/* Ant-3d */}
                                    <tr>
                                        <td rowSpan="3" className="font-bold p-3">Ant-3d</td>
                                        <td className="p-3">HV (10⁷ &uarr;)</td>
                                        <td className="p-3">0.94 &plusmn; 0.12</td>
                                        <td className="p-3">0.55 &plusmn; 0.81</td>
                                        <td className="p-3">2.61 &plusmn; 0.26</td>
                                        <td className="font-bold p-3">2.68 &plusmn; 0.21</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">EU (10² &uarr;)</td>
                                        <td className="p-3">1.07 &plusmn; 0.07</td>
                                        <td className="p-3">2.41 &plusmn; 0.20</td>
                                        <td className="font-bold p-3">2.06 &plusmn; 0.14</td>
                                        <td className="p-3">1.99 &plusmn; 0.08</td>
                                    </tr>
                                    <tr className="border-b border-slate-300">
                                        <td className="p-3">SP (10³ &darr;)</td>
                                        <td className="p-3">0.02 &plusmn; 0.01</td>
                                        <td className="p-3">1.96 &plusmn; 0.79</td>
                                        <td className="p-3">0.06 &plusmn; 0.07</td>
                                        <td className="font-bold p-3">0.004 &plusmn; 0.002</td>
                                    </tr>
                                    {/* Humanoid-2d */}
                                    <tr>
                                        <td rowSpan="3" className="font-bold p-3">Humanoid-2d</td>
                                        <td className="p-3">HV (10⁵ &uarr;)</td>
                                        <td className="p-3">2.62 &plusmn; 0.32</td>
                                        <td className="p-3">1.98 &plusmn; 0.02</td>
                                        <td className="p-3">3.43 &plusmn; 0.06</td>
                                        <td className="font-bold p-3">3.76 &plusmn; 0.11</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">EU (10² &uarr;)</td>
                                        <td className="p-3">4.06 &plusmn; 0.32</td>
                                        <td className="p-3">3.67 &plusmn; 0.02</td>
                                        <td className="p-3">4.78 &plusmn; 0.05</td>
                                        <td className="font-bold p-3">5.11 &plusmn; 0.09</td>
                                    </tr>
                                    <tr className="border-b border-slate-300">
                                        <td className="p-3">SP (10⁴ &darr;)</td>
                                        <td className="p-3">0.13 &plusmn; 0.17</td>
                                        <td className="p-3">0<sup>*</sup></td>
                                        <td className="p-3">2.21 &plusmn; 3.47</td>
                                        <td className="font-bold p-3">0.003 &plusmn; 0.001</td>
                                    </tr>
                                    {/* Building-9d */}
                                    <tr>
                                        <td rowSpan="3" className="font-bold p-3">Building-9d</td>
                                        <td className="p-3">HV (10³¹ &uarr;)</td>
                                        <td className="italic p-3">T/O</td>
                                        <td className="italic p-3">T/O</td>
                                        <td className="p-3">7.93 &plusmn; 0.07</td>
                                        <td className="font-bold p-3">8.00 &plusmn; 0.11</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">EU (10³ &uarr;)</td>
                                        <td className="italic p-3">T/O</td>
                                        <td className="italic p-3">T/O</td>
                                        <td className="p-3">3.50 &plusmn; 0.00</td>
                                        <td className="font-bold p-3">3.50 &plusmn; 0.003</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">SP (10³ &darr;)</td>
                                        <td className="italic p-3">T/O</td>
                                        <td className="italic p-3">T/O</td>
                                        <td className="p-3">2.79 &plusmn; 0.40</td>
                                        <td className="font-bold p-3">0.03 &plusmn; 0.01</td>
                                    </tr>
                                </tbody>
                            </table>
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

export default D3poPage;
