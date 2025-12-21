import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RampsPage from './pages/RampsPage';
import D3poPage from './pages/D3poPage';

import RampsBlogPage from './pages/RampsBlogPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ramps" element={<RampsPage />} />
                <Route path="/ramps/blog" element={<RampsBlogPage />} />
                <Route path="/d3po" element={<D3poPage />} />
            </Routes>
        </Router>
    );
}

export default App;
