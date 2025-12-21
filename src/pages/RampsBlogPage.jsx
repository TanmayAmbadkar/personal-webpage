import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';

const RampsBlogPage = () => {
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
        <div className="font-sans bg-slate-50 text-slate-900 min-h-screen antialiased" ref={contentRef}>
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/ramps" className="text-2xl font-bold text-slate-900">RAMPS</Link>
                    <nav className="flex gap-6 items-center">
                        <Link to="/ramps" className="text-slate-600 hover:text-slate-900">Home</Link>
                        {/* <span className="text-blue-600 font-semibold">Blog</span> */}
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-5xl">
                {/* Title */}
                <section className="text-center py-12 mb-8 rounded-xl bg-slate-100" style={{
                    backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">RAMPS: Robust Adaptive Multi-Step Predictive Shielding — Deep Dive</h1>
                    <p className="text-base text-slate-600 max-w-4xl mx-auto">
                        <em>Tanmay Ambadkar, Darshan Chudiwal, Greg Anderson, Abhinav Verma</em>
                    </p>
                </section>

                <article className="bg-white rounded-xl shadow-lg p-7">
                    {/* TL;DR */}
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md my-4">
                        <p className="text-lg font-semibold mb-2">TL;DR</p>
                        <p className="text-slate-800 leading-relaxed">RAMPS enforces state-based safety for RL by learning a single linear dynamics model (optionally in a lifted Koopman space), constructing multi-step robust Control Barrier Function constraints that account for accumulated model error, and solving a minimally invasive QP per step with an adaptive horizon. Scales to high-dimensional tasks and runs in real-time.</p>
                    </div>

                    {/* 1. Introduction & Motivation */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">1. Introduction and motivation</h2>
                    <p className="text-slate-800 leading-relaxed mb-3">Reinforcement learning (RL) agents discover policies by trial and error. In real systems, that trial and error may physically damage equipment or people. We want an agent that can improve its policy while guaranteeing safety at every interaction, not only after offline validation.</p>

                    <p className="text-slate-800 leading-relaxed mb-3">Existing approaches fall into three rough categories:</p>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li><strong>Formal/shielding:</strong> Build a model and compute safe actions with formal certificates. These can give guarantees but usually do not scale beyond low-dimensional dynamics because they require many local approximations or expensive nonlinear reachability.</li>
                        <li><strong>Cost-based constrained RL:</strong> Optimize reward with constraints turned into costs. These scale, but they allow violations while learning since the constraint is enforced only in expectation or via penalties.</li>
                        <li><strong>Purely data-driven:</strong> Learn safe behavior from data (imitation or offline RL). This requires safe demonstrations or large offline datasets, not always available.</li>
                    </ul>

                    <p className="text-slate-800 leading-relaxed mb-3">RAMPS aims to get the best of the first and second: formal-style certificates that are computationally tractable at scale by using a single global linear model and multi-step reasoning with robust tightening. The approach keeps online per-step computation small (warm-started QPs, binary search over horizons), enabling real-time control.</p>

                    {/* 2. The Core Idea */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">2. Core idea</h2>
                    <p className="text-slate-800 leading-relaxed mb-3">In one sentence: learn a linear predictive model, derive linear multi-step safety constraints that account for accumulated model error, and solve a minimally invasive quadratic program to enforce them, choosing the largest feasible prediction horizon to resolve delayed control authority (relative degree) while avoiding excessive conservatism.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Why a single linear model?</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">Using many local linear models creates a combinatorial explosion in high dimensions and complicates certificate composition. A single global linear model is efficient: we can precompute powers of A, constant constraint rows, and reuse them across steps. For nonlinear systems, we lift the state with a learned encoder (Deep Koopman) so dynamics in lifted space are approximately linear.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">The high relative-degree trap</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">If the safety variable does not respond immediately to control (relative degree {`> 1`}), a one-step certificate cannot change the safety outcome. Multi-step predictions let the shield pick actions now that influence the constraint later. The adaptive horizon ensures the shield uses the shortest horizon that provides authority, minimizing conservatism.</p>

                    {/* 3. Background */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">3. Background: safe sets, CBFs, relative degree</h2>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Safe sets</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">We represent safety as a polyhedron:</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$\\mathcal{C}=\\bigcap_{i=1}^M\\{z\\mid p_i^\\top z + b_i \\le 0\\}$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Each face i corresponds to constraint p_i^T z + b_i &le; 0. Define the safety function h_i(z) = -(p_i^T z + b_i), so the safe set is {'{'}z | h_i(z) &ge; 0 for all i{'}'}.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Discrete-time control barrier functions (CBFs)</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">In discrete time, a CBF enforces a relation between current and next-step safety:</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$h(F(x_k,u_k)) \\ge \\lambda h(x_k),\\quad \\lambda\\in[0,1]$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">This ensures the safety margin does not shrink faster than allowed. The value of \(\lambda\) trades off conservatism and feasibility.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Relative degree (practical viewpoint)</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">{String.raw`Relative degree r for a constraint means control u_k influences the constraint only after r steps. Formally, smallest r such that \(p^\top A^{r - 1}B\ne 0\) for linearized dynamics. If r > 1, one-step CBFs cannot enforce the constraint because the control does not appear in z_{k+1} for that face.`}</p>

                    {/* 4. How RAMPS Works */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">4. RAMPS components and algorithm</h2>

                    <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Learned linear dynamics</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">We fit a model of the form:</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$z_{k+1} = A z_k + B u_k + c + w_k,\\qquad \\|w_k\\|_\\infty \\le \\epsilon$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Training options:</p>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li><strong>Linear regression:</strong> ridge regression on features \([z_k,u_k,1]\) suitable for near-linear systems.</li>
                        <li><strong>Deep Koopman:</strong> encoder \(\phi\) that maps z to a lifted z^, with linear A,B,c in the lifted space. Loss includes one-step prediction and optionally multi-step consistency.</li>
                    </ul>
                    <p className="text-slate-800 leading-relaxed mb-3">Model updates are periodic. After each update we recompute precomputed matrices and the error bound ε from hold-out validation samples (high percentile, e.g., 99th).</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Multi-step robust CBF</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">Nominal multi-step prediction (closed form):</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$z_j(z,u)=A^j z + \\sum_{k=0}^{j-1} A^{j-1-k} B u_k + \\sum_{k=0}^{j-1} A^k c$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Accumulated worst-case error bound over j steps:</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$\\mathcal{E}_j(p_i)=\\sum_{k=0}^{j-1} \\epsilon\\|p_i^\\top A^k\\|_1$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Robust safety constraint for face i at step j:</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$p_i^\\top z_j(z,u) + b_i \\le \\lambda^j (p_i^\\top z + b_i) - \\mathcal{E}_j(p_i)$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Important properties:</p>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>Each such constraint is linear in the control sequence u.</li>
                        <li>We only need constraints for j {`>=`} relative degree r_i, since earlier j do not include control terms for that face.</li>
                        <li>All constraints together form G u {`<=`} h, where G is precomputable given A,B and p_i.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4 mb-2">4.3 Minimally invasive QP</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">{String.raw`Given agent action \(a_\pi\), we solve:`}</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {String.raw`$$\begin{aligned}
                        \min_{u_0,\dots,u_{H-1}}&\quad \|u_0 - a_\pi\|_2^2 \\
                        \text{s.t.}&\quad G_H u \le h_H(z) \\
                        &\quad u_k \in \mathcal{U},\quad k=0..H-1
                        \end{aligned}$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Only u_0 is executed. The objective keeps corrections small and localized. The QP is convex and small (dimension m*H variables where m is action dim), and warm-starting from previous solves makes it fast.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">4.4 Adaptive horizon (practical algorithm)</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">We search for largest feasible H in [H_min, H_max] by binary search. Rationale:</p>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>Larger H gives more authority for constraints with larger relative degree.</li>
                        <li>Larger H also increases accumulated tightening and may reduce feasibility.</li>
                    </ul>
                    <p className="text-slate-800 leading-relaxed mb-3">Binary search minimizes QP solves. Each candidate QP uses precomputed \(G_H\) and warm-start from nearest feasible H. If no feasible H is found, call a deterministic backup policy that solves a small LP to steer away from the tightest constraint.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">4.5 Online loop and model updates</h3>
                    <ol className="list-decimal ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>{String.raw`Observe \(z_k\), propose \(a_\pi \leftarrow \pi(z_k)\).`}</li>
                        <li>{String.raw`Binary search \(H\) and solve QPs until largest feasible \(H^*\) found.`}</li>
                        <li>{String.raw`Apply \(u_0\) (or backup), observe \(z_{k + 1}\), store \((z,u,z')\).`}</li>
                        <li>{String.raw`Periodically retrain/update model and recompute \(\epsilon\) and precomputations.`}</li>
                    </ol>

                    {/* 5. Multi-step CBF deep dive */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">5. The multi-step robust CBF — equations and intuition</h2>
                    <p className="text-slate-800 leading-relaxed mb-3">We show how the tightening term arises and how constraints become linear in u.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Unrolling true dynamics and bounding error</h3>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$z_{k+1}=Az_k+Bu_k+c+w_k,\\quad \\|w_k\\|_\\infty\\le\\epsilon$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Unroll \(j\) steps:</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$z_j=A^j z + \\sum_{k=0}^{j-1} A^{j-1-k} B u_k + \\sum_{k=0}^{j-1} A^k c + \\sum_{k=0}^{j-1} A^{j-1-k} w_k$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Projecting on face \(p_i\):</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$p_i^\\top z_j = p_i^\\top A^j z + \\sum_{k=0}^{j-1} p_i^\\top A^{j-1-k} B u_k + p_i^\\top\\sum_{k=0}^{j-1}A^k c + p_i^\\top\\sum_{k=0}^{j-1} A^{j-1-k} w_k$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Bound the error term in absolute value using \(\|w_k\|_\infty\le\epsilon\):</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {`$$\\left|p_i^\\top\\sum_{k=0}^{j-1} A^{j-1-k} w_k\\right| \\le \\sum_{k=0}^{j-1} \\|p_i^\\top A^{j-1-k}\\|_1 \\, \\|w_k\\|_\\infty \\le \\mathcal{E}_j(p_i)$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Thus we tighten the RHS of the nominal inequality by E_j(p_i) to remain conservative for worst-case errors.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Linear constraint form</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">{String.raw`Collect coefficients of the control sequence \(u=(u_0,\dots,u_{H - 1})\). For a given \(j\) and face \(i\):`}</p>
                    <div className="p-4 bg-slate-100 rounded-lg text-center overflow-auto my-4">
                        {String.raw`$$\sum_{k=0}^{j-1} (p_i^\top A^{j-1-k} B) u_k \le \lambda^j (p_i^\top z + b_i) - p_i^\top A^j z - p_i^\top \sum_{k=0}^{j-1} A^k c - b_i - \mathcal{E}_j(p_i)$$`}
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Each row is a constant vector times u, so we can assemble G and h efficiently. This is the key computational advantage: the problem reduces to a small convex QP with linear constraints.</p>

                    {/* 6. Formal guarantees */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">6. Formal guarantees</h2>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Theorem 1: Model-relative forward invariance</h3>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md my-4">
                        <p className="font-semibold">Statement</p>
                        <p>{String.raw`If at each time step the robust multi-step QP is feasible under the learned model and the true residuals satisfy \|w_k\|_\infty \le \epsilon, then the closed-loop trajectory stays in \(\mathcal{C}\) for all times \(k\ge 0\).`}</p>
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">Proof sketch: induction. Feasibility gives a control sequence u that keeps all predicted z_k+1..k+H inside the safe set given the epsilon tightening. Applying u_0 moves the system to z_k+1 which is in the safe set; repeat.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Theorem 2: High-probability model accuracy</h3>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md my-4">
                        <p className="font-semibold">Statement (informal)</p>
                        <p>{String.raw`Estimating \(\epsilon\) as a high quantile (e.g., 99th) of validation errors gives a bound on the probability that future model errors exceed \(\epsilon\). Using concentration results, one can quantify this tail probability and thereby convert the deterministic guarantee into a high-probability one for the real system.`}</p>
                    </div>
                    <p className="text-slate-800 leading-relaxed mb-3">{String.raw`Practical implication: choose \(\epsilon\) at a high percentile and recalibrate periodically to maintain the guarantee under distribution shift.`}</p>

                    {/* 7. Implementation & complexity */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">7. Implementation and complexity</h2>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Precomputation</h3>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>{String.raw`Compute \(A^k\) for \(k=0..\!H_{\max}\) (dominant cost: O(H·s^3)).`}</li>
                        <li>{String.raw`Compute \(p_i^\top A^k B\) rows for all faces \(i\) and k (O(m·H·s^2)).`}</li>
                        <li>{String.raw`Compute drift sums \(\sum A^k c\) and error terms \(\mathcal{E}_j(p_i)\).`}</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Per-step work</h3>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>{String.raw`Compute state-dependent vector \(h = M_h z + v_h\) (O(m·H·s)).`}</li>
                        <li>Binary search over H with O(log H) QP solves; each QP warm-started.</li>
                        <li>QP variables = action_dim × H; constraints ≈ faces × H.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Run-time numbers (empirical)</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">From the experiments (see below), average per-step shield time is under 0.5 ms across environments, making RAMPS compatible with real-time control loops.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Estimating ε in practice</h3>
                    <p className="text-slate-800 leading-relaxed mb-3">Procedure:</p>
                    <ol className="list-decimal ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>Hold out a validation set (e.g., 20% of collected data, capped).</li>
                        <li>{String.raw`Compute one-step prediction residuals \|z_{k + 1} - (Az_k + Bu_k + c)\|_\infty.`}</li>
                        <li>{String.raw`Set \(\epsilon\) to a high quantile (99th recommended).`}</li>
                        <li>{String.raw`Recompute after each model update or if residual statistics drift.`}</li>
                    </ol>

                    {/* 8. Experiments & results */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">8. Experiments and results</h2>
                    <p className="text-slate-800 leading-relaxed mb-3">We evaluate on classical and locomotion benchmarks from safety-gymnasium with state constraints, comparing RAMPS variants to constrained/penalty RL and model-based shielding baselines.</p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Environments</h3>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div className="bg-slate-100 p-4 rounded-lg">
                            <p className="font-semibold">Pendulum</p>
                            <p className="text-sm text-slate-600">{String.raw`State dim: 3 | Action dim: 1 | Constraint: |\theta| \le 0.4`}</p>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg">
                            <p className="font-semibold">SafeHopper</p>
                            <p className="text-sm text-slate-600">State dim: 11 | Action dim: 3</p>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg">
                            <p className="font-semibold">SafeCheetah</p>
                            <p className="text-sm text-slate-600">State dim: 17 | Action dim: 6</p>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg">
                            <p className="font-semibold">SafeAnt</p>
                            <p className="text-sm text-slate-600">State dim: 27 (105 lifted) | Action dim: 8</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Baselines and variants</h3>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>SauteRL, P3O, CUP: constrained/penalty RL baselines</li>
                        <li>SPICE + L / SPICE + K: model-based multi-step weakest-preconditions shielding with linear or Koopman model</li>
                        <li>RAMPS + L: RAMPS with direct linear model</li>
                        <li>RAMPS + K: RAMPS with Deep Koopman lifted model</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Key highlights</h3>
                    <div className="grid md:grid-cols-3 gap-4 my-6 text-center">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">Up to 90%</p>
                            <p className="text-sm text-slate-600">Reduction in safety violations vs state-of-the-art safe RL</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">100+</p>
                            <p className="text-sm text-slate-600">Scales to {`> 100`} lifted state dimensions</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">&lt;0.5 ms</p>
                            <p className="text-sm text-slate-600">Average per-step shield computation time</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Cumulative safety violations during training</h3>
                    <div className="overflow-x-auto my-4">
                        <table className="min-w-full bg-white border border-slate-300 rounded-lg">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="p-3">Algorithm</th>
                                    <th className="text-center p-3">SafeHopper</th>
                                    <th className="text-center p-3">SafeCheetah</th>
                                    <th className="text-center p-3">SafeAnt</th>
                                    <th className="text-center p-3">Pendulum</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-3">SauteRL</td>
                                    <td className="text-center p-3">703 ± 78</td>
                                    <td className="text-center p-3">183 ± 25</td>
                                    <td className="text-center p-3">1221 ± 203</td>
                                    <td className="text-center p-3">91 ± 22</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="p-3">CUP</td>
                                    <td className="text-center p-3">673 ± 63</td>
                                    <td className="text-center p-3">122 ± 22</td>
                                    <td className="text-center p-3">1883 ± 221</td>
                                    <td className="text-center p-3">184 ± 225</td>
                                </tr>
                                <tr>
                                    <td className="p-3">P3O</td>
                                    <td className="text-center p-3">620 ± 6</td>
                                    <td className="text-center p-3">185 ± 8</td>
                                    <td className="text-center p-3">1481 ± 446</td>
                                    <td className="text-center p-3">173 ± 166</td>
                                </tr>
                                <tr className="bg-slate-50 italic">
                                    <td className="p-3">SPICE + L</td>
                                    <td className="text-center italic p-3">Failed</td>
                                    <td className="text-center italic p-3">Failed</td>
                                    <td className="text-center italic p-3">Failed</td>
                                    <td className="text-center p-3">495 ± 128</td>
                                </tr>
                                <tr>
                                    <td className="p-3">SPICE + K</td>
                                    <td className="text-center p-3">459 ± 105</td>
                                    <td className="text-center p-3">169 ± 70</td>
                                    <td className="text-center italic p-3">Failed</td>
                                    <td className="text-center p-3">87 ± 8</td>
                                </tr>
                                <tr className="bg-blue-50">
                                    <td className="font-semibold p-3">RAMPS + L</td>
                                    <td className="text-center font-semibold text-blue-700 p-3">193 ± 44</td>
                                    <td className="text-center font-semibold text-blue-700 p-3">7 ± 7</td>
                                    <td className="text-center font-semibold text-blue-700 p-3">162 ± 42</td>
                                    <td className="text-center font-semibold text-blue-700 p-3">69 ± 6</td>
                                </tr>
                                <tr className="bg-green-50">
                                    <td className="font-semibold p-3">RAMPS + K</td>
                                    <td className="text-center font-semibold text-green-700 p-3">172 ± 15</td>
                                    <td className="text-center font-semibold text-green-700 p-3">26 ± 17</td>
                                    <td className="text-center font-semibold text-green-700 p-3">111 ± 23</td>
                                    <td className="text-center font-semibold text-green-700 p-3">53 ± 6</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-sm text-slate-600 mt-2 text-center">Lower is better. "Failed" indicates training instability or inability to complete safe episodes.</p>
                    </div>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Figures and qualitative curves</h3>
                    <div className="space-y-8">
                        {/* Row 1: Safety Violations */}
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-slate-800 text-center">Cumulative Safety Violations</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Pendulum */}
                                <div className="text-center bg-slate-100 p-2 rounded-lg">
                                    <img src="/images/RAMPS/violations_pendulum.png" alt="Pendulum Violations Graph" className="rounded-lg shadow-md w-full" />
                                    <p className="mt-2 font-semibold text-slate-700">(a) Pendulum</p>
                                </div>
                                {/* Cheetah */}
                                <div className="text-center bg-slate-100 p-2 rounded-lg">
                                    <img src="/images/RAMPS/violations_cheetah.png" alt="Cheetah Violations Graph" className="rounded-lg shadow-md w-full" />
                                    <p className="mt-2 font-semibold text-slate-700">(b) Cheetah</p>
                                </div>
                                {/* Hopper */}
                                <div className="text-center bg-slate-100 p-2 rounded-lg">
                                    <img src="/images/RAMPS/violations_hopper.png" alt="Hopper Violations Graph" className="rounded-lg shadow-md w-full" />
                                    <p className="mt-2 font-semibold text-slate-700">(c) Hopper</p>
                                </div>
                                {/* Ant */}
                                <div className="text-center bg-slate-100 p-2 rounded-lg">
                                    <img src="/images/RAMPS/violations_ant.png" alt="Ant Violations Graph" className="rounded-lg shadow-md w-full" />
                                    <p className="mt-2 font-semibold text-slate-700">(d) Ant</p>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Reward */}
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-slate-800 text-center">Reward Curves</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Pendulum */}
                                <div className="text-center bg-slate-100 p-2 rounded-lg">
                                    <img src="/images/RAMPS/reward_pendulum.png" alt="Pendulum Reward Graph" className="rounded-lg shadow-md w-full" />
                                    <p className="mt-2 font-semibold text-slate-700">(a) Pendulum</p>
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

                    <h3 className="text-xl font-semibold mt-4 mb-2">Empirical takeaways</h3>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>RAMPS yields large reductions in cumulative safety violations (often an order of magnitude vs baselines).</li>
                        <li>RAMPS scales to large, lifted state dimensions where one-step shields fail.</li>
                        <li>Minimally invasive objective preserves task reward; in some tasks it improves learning stability.</li>
                        <li>Robust tightening is mandatory; removing it breaks safety guarantees.</li>
                    </ul>

                    {/* 9. Ablations */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">9. Ablation studies and diagnostics</h2>
                    <p className="text-slate-800 leading-relaxed mb-3">Key ablations from the paper that inform implementation choices:</p>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li><strong>Tightening removal:</strong> {String.raw`Removing \(\mathcal{E}_j\) causes optimism: shields certify unsafe actions and violations increase.`}</li>
                        <li><strong>H variation:</strong> H approx 5 often best; too small cannot resolve relative-degree traps; too large compounds error and reduces feasibility.</li>
                        <li><strong>\(\lambda\) variation:</strong> {String.raw`Very large \(\lambda\) (close to 1) is too strict and makes QPs infeasible; \(\lambda\) in [0.4,0.7] works well across tasks.`}</li>
                        <li><strong>\(\epsilon\) percentile:</strong> {String.raw`high-percentile (99th) is recommended—underestimating ε leads to violations; being conservative helps learning stability.`}</li>
                    </ul>

                    {/* 10. Takeaways and limitations */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">10. Takeaways, limitations, and future directions</h2>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Takeaways</h3>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>Linear models plus multi-step robust CBF give practical, near-formal safety guarantees at scale.</li>
                        <li>Adaptive horizon and warm-started QPs keep per-step time low while resolving delayed control authority.</li>
                        <li>Explicit worst-case tightening is necessary for reliability during learning.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Limitations</h3>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li><strong>Cold-start:</strong> Without a pre-trained model the earliest steps may violate safety while collecting model-fitting data. Mitigation: pretrain on offline data where possible.</li>
                        <li><strong>Linearity assumption:</strong> Works best when dynamics are approximately linear in raw or lifted space; strongly hybrid/discontinuous systems may need piecewise-linear extensions.</li>
                        <li><strong>Probabilistic guarantee:</strong> Safety is guaranteed conditioned on ε; in practice ε is estimated and thus guarantees are high-probability, not absolute.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Future directions</h3>
                    <ul className="list-disc ml-6 text-slate-800 leading-relaxed mb-3">
                        <li>Online / conformal calibration of ε.</li>
                        <li>Safety-aware representation learning that minimizes the tightening term directly.</li>
                        <li>Extensions to hierarchical and multi-agent settings.</li>
                        <li>Hardware demonstrations to validate sim-to-real behavior.</li>
                    </ul>

                    {/* 11. Appendix */}
                    <h2 className="text-2xl font-bold mt-6 mb-3">11. Appendix: pseudocode</h2>
                    <div className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-auto font-mono text-sm">
                        <pre>
                            {`Given: model (A,B,c), error bound ε, safety faces {p_i,b_i}, agent π, H_min, H_max, QP solver

loop each timestep:
  observe z
  a_π ← π(z)
  best_u ← None; best_H ← None
  H_lo ← H_min; H_hi ← H_max
  while H_lo ≤ H_hi:
    H_mid ← floor((H_lo + H_hi)/2)
    build G,u ≤ h for horizon H_mid (use precomputed A^k)
    solve QP: min ||u_0 - a_π||^2 s.t. G u ≤ h, u_k ∈ U
    if feasible:
      best_u ← solution; best_H ← H_mid; H_lo ← H_mid + 1
    else:
      H_hi ← H_mid - 1
  if best_u is None:
    apply u_backup(z)
  else:
    apply best_u[0]
  collect data; periodically retrain model and recompute ε; update precomputations`}
                        </pre>
                    </div>

                    {/* Learn more */}
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md my-4 mt-6">
                        <p className="font-semibold mb-2">Learn more</p>
                        <p>Full proofs, additional ablations, and code are in the paper and accompanying repository.</p>
                        <div className="flex gap-4 mt-3">
                            <a href="https://openreview.net/forum?id=2bbqHOWFTU" className="text-blue-600 hover:text-blue-800 font-semibold" target="_blank" rel="noopener noreferrer">Read the paper →</a>
                            <a href="https://github.com/TanmayAmbadkar/sparkd" className="text-blue-600 hover:text-blue-800 font-semibold" target="_blank" rel="noopener noreferrer">View code →</a>
                        </div>
                    </div>

                </article>
            </main>

            <footer className="bg-white border-t mt-12">
                <div className="container mx-auto px-6 py-8 text-center text-slate-600">
                    <p className="mb-2">&copy;Paper under double-blind review for ICLR 2026.</p>
                </div>
            </footer>
        </div>
    );
};

export default RampsBlogPage;
