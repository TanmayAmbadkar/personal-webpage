import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
            <SEO
                title="404: Page Not Found | Tanmay Ambadkar"
                description="The page you are looking for does not exist."
            />
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-red-500/10 rounded-full">
                            <AlertTriangle size={64} className="text-red-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-text mb-4">404</h1>
                    <h2 className="text-xl md:text-2xl font-semibold text-muted mb-8">Page Not Found</h2>
                    <p className="text-muted max-w-md mx-auto mb-8">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
