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

    const toggleTheme = (e) => {
        const nextIsDark = !isDark;

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
        if (!document.startViewTransition) {
            updateDOM();
            return;
        }

        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            updateDOM();
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            // Different animation direction based on theme
            document.documentElement.animate(
                {
                    clipPath: nextIsDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: nextIsDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
                }
            );
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
