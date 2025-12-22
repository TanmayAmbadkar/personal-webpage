import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import SmoothScroll from './components/SmoothScroll';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const RampsPage = lazy(() => import('./pages/RampsPage'));
const RampsBlogPage = lazy(() => import('./pages/RampsBlogPage'));
const D3poPage = lazy(() => import('./pages/D3poPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
    return (
        <Router>
            <SmoothScroll />
            <ScrollToTop />
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ramps" element={<RampsPage />} />
                    <Route path="/ramps/blog" element={<RampsBlogPage />} />
                    <Route path="/d3po" element={<D3poPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
