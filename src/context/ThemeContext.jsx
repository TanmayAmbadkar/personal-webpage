import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check system preference or saved theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        } else if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(prefersDark);
            if (!prefersDark) {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
            } else {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            }
        }
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Helper to perform the actual DOM updates
        const updateDOM = () => {
            setIsDark(nextIsDark);
            if (nextIsDark) {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        };

        // Use View Transitions API if available
        if (!document.startViewTransition || reduceMotion) {
            updateDOM();
            return;
        }

        document.startViewTransition(() => {
            updateDOM();
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
