import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';

import HomePage from './pages/HomePage';

// Lazy load pages
// const HomePage = lazy(() => import('./pages/HomePage'));
const RampsPage = lazy(() => import('./pages/RampsPage'));
const RampsBlogPage = lazy(() => import('./pages/RampsBlogPage'));
const D3poPage = lazy(() => import('./pages/D3poPage'));
const AutoSpecPage = lazy(() => import('./pages/AutoSpecPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { ScrollProvider } from './context/ScrollContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <ScrollProvider>
                <Router>
                    <ScrollToTop />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/ramps" element={<RampsPage />} />
                            <Route path="/ramps/blog" element={<RampsBlogPage />} />
                            <Route path="/d3po" element={<D3poPage />} />
                            <Route path="/autospec" element={<AutoSpecPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </Router>
            </ScrollProvider>
        </ThemeProvider>
    );
}

export default App;
