import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="text-amber-400" size={20} />
            ) : (
                <Moon className="text-slate-600" size={20} />
            )}
        </button>
    );
};

export default ThemeToggle;
