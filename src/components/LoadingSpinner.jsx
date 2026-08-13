import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin motion-reduce:animate-none"></div>
        </div>
    );
};

export default LoadingSpinner;
