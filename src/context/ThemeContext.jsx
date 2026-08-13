import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const PALETTE_QUERY_PARAM = 'palette';

const palettes = [
    {
        dark: { '--bg-primary': '#181719', '--bg-secondary': '#222024', '--text-primary': '#f7f2f3', '--text-muted': '#b9afb2', '--color-accent': '#ef6b5d', '--color-accent-ink': '#241312', '--color-signal': '#f2c46f', '--scrollbar-thumb': '#40383b', '--color-separator': '#40383b', '--color-field-line': '#4b3739', '--color-field-node': '#ef6b5d', '--atlas-moss': '#242021', '--atlas-paper': '#1d1b1d', '--atlas-white': '#2a2729' },
        light: { '--bg-primary': '#f5f1ee', '--bg-secondary': '#fffdf9', '--text-primary': '#201a1a', '--text-muted': '#665c5c', '--color-accent': '#b84236', '--color-accent-ink': '#ffffff', '--color-signal': '#9e6900', '--scrollbar-thumb': '#d6cbc6', '--color-separator': '#ded4cf', '--color-field-line': '#e2cbc5', '--color-field-node': '#b84236', '--atlas-moss': '#eee4df', '--atlas-paper': '#f8f3f0', '--atlas-white': '#fffdf9' }
    },
    {
        dark: { '--bg-primary': '#120d21', '--bg-secondary': '#1d1533', '--text-primary': '#f7f1ff', '--text-muted': '#c0afd9', '--color-accent': '#a878ff', '--color-accent-ink': '#1b0b37', '--color-signal': '#ffdd55', '--scrollbar-thumb': '#382953', '--color-separator': '#382953', '--color-field-line': '#513b75', '--color-field-node': '#a878ff', '--atlas-moss': '#1b1330', '--atlas-paper': '#171026', '--atlas-white': '#251a3e' },
        light: { '--bg-primary': '#f4efff', '--bg-secondary': '#fdfaff', '--text-primary': '#211636', '--text-muted': '#645777', '--color-accent': '#7040cf', '--color-accent-ink': '#ffffff', '--color-signal': '#927000', '--scrollbar-thumb': '#d7cce8', '--color-separator': '#e1d8ef', '--color-field-line': '#d7c6ef', '--color-field-node': '#7040cf', '--atlas-moss': '#e8ddf7', '--atlas-paper': '#f7f2ff', '--atlas-white': '#fdfaff' }
    },
    {
        dark: { '--bg-primary': '#081623', '--bg-secondary': '#0d2336', '--text-primary': '#edf8ff', '--text-muted': '#a8c2d4', '--color-accent': '#32b8ff', '--color-accent-ink': '#071b2a', '--color-signal': '#d9f341', '--scrollbar-thumb': '#24455f', '--color-separator': '#24455f', '--color-field-line': '#285c78', '--color-field-node': '#32b8ff', '--atlas-moss': '#0c2638', '--atlas-paper': '#0a1c2b', '--atlas-white': '#102d42' },
        light: { '--bg-primary': '#eff8ff', '--bg-secondary': '#fbfdff', '--text-primary': '#122638', '--text-muted': '#536c80', '--color-accent': '#007ac2', '--color-accent-ink': '#ffffff', '--color-signal': '#6a7900', '--scrollbar-thumb': '#c7dbe9', '--color-separator': '#d2e4ef', '--color-field-line': '#bfdef0', '--color-field-node': '#007ac2', '--atlas-moss': '#dceef9', '--atlas-paper': '#f1f9ff', '--atlas-white': '#fbfdff' }
    },
    {
        dark: { '--bg-primary': '#23120c', '--bg-secondary': '#341b11', '--text-primary': '#fff3e9', '--text-muted': '#d1b0a1', '--color-accent': '#ff7440', '--color-accent-ink': '#321006', '--color-signal': '#ffcc4d', '--scrollbar-thumb': '#593329', '--color-separator': '#593329', '--color-field-line': '#75402e', '--color-field-node': '#ff7440', '--atlas-moss': '#321b11', '--atlas-paper': '#28150e', '--atlas-white': '#402318' },
        light: { '--bg-primary': '#fff1e9', '--bg-secondary': '#fffaf7', '--text-primary': '#321b12', '--text-muted': '#765b4e', '--color-accent': '#c64219', '--color-accent-ink': '#ffffff', '--color-signal': '#966200', '--scrollbar-thumb': '#e6cec2', '--color-separator': '#eed8cf', '--color-field-line': '#f0cdbd', '--color-field-node': '#c64219', '--atlas-moss': '#f8dfd2', '--atlas-paper': '#fff3ed', '--atlas-white': '#fffaf7' }
    },
    {
        dark: { '--bg-primary': '#171a20', '--bg-secondary': '#1e242d', '--text-primary': '#f0f4f9', '--text-muted': '#adb7c4', '--color-accent': '#78a9f2', '--color-accent-ink': '#111c30', '--color-signal': '#ef926c', '--scrollbar-thumb': '#343e4c', '--color-separator': '#343e4c', '--color-field-line': '#3a4960', '--color-field-node': '#78a9f2', '--atlas-moss': '#1d252f', '--atlas-paper': '#1a1e25', '--atlas-white': '#252b34' },
        light: { '--bg-primary': '#f0f3f7', '--bg-secondary': '#fbfdff', '--text-primary': '#17202d', '--text-muted': '#586678', '--color-accent': '#356ebc', '--color-accent-ink': '#ffffff', '--color-signal': '#b84d2e', '--scrollbar-thumb': '#cbd4df', '--color-separator': '#d5dee8', '--color-field-line': '#cbd9eb', '--color-field-node': '#356ebc', '--atlas-moss': '#e0e8f0', '--atlas-paper': '#f3f6fa', '--atlas-white': '#fbfdff' }
    },
    {
        dark: { '--bg-primary': '#030805', '--bg-secondary': '#07120a', '--text-primary': '#e9ffe9', '--text-muted': '#9ab89b', '--color-accent': '#56f479', '--color-accent-ink': '#031007', '--color-signal': '#c8ff63', '--scrollbar-thumb': '#1c3d25', '--color-separator': '#1c3d25', '--color-field-line': '#1e5930', '--color-field-node': '#56f479', '--atlas-moss': '#07140b', '--atlas-paper': '#050d08', '--atlas-white': '#0b1b10' },
        light: { '--bg-primary': '#edf7ed', '--bg-secondary': '#fbfffb', '--text-primary': '#102015', '--text-muted': '#516858', '--color-accent': '#168438', '--color-accent-ink': '#ffffff', '--color-signal': '#637c00', '--scrollbar-thumb': '#c7dac8', '--color-separator': '#d1e2d2', '--color-field-line': '#bfdfc2', '--color-field-node': '#168438', '--atlas-moss': '#def0df', '--atlas-paper': '#f1f9f1', '--atlas-white': '#fbfffb' }
    },
    {
        dark: { '--bg-primary': '#101720', '--bg-secondary': '#172431', '--text-primary': '#f0f7fb', '--text-muted': '#aabcc8', '--color-accent': '#56d5c0', '--color-accent-ink': '#08221d', '--color-signal': '#ff9b55', '--scrollbar-thumb': '#2d4351', '--color-separator': '#2d4351', '--color-field-line': '#315965', '--color-field-node': '#56d5c0', '--atlas-moss': '#142530', '--atlas-paper': '#121d27', '--atlas-white': '#1c2d38' },
        light: { '--bg-primary': '#edf5f5', '--bg-secondary': '#fbffff', '--text-primary': '#172324', '--text-muted': '#53686a', '--color-accent': '#087b70', '--color-accent-ink': '#ffffff', '--color-signal': '#b95112', '--scrollbar-thumb': '#c5d7d8', '--color-separator': '#d1e1e1', '--color-field-line': '#c0dddd', '--color-field-node': '#087b70', '--atlas-moss': '#dcebec', '--atlas-paper': '#f1f8f8', '--atlas-white': '#fbffff' }
    },
    {
        dark: { '--bg-primary': '#1b1019', '--bg-secondary': '#271625', '--text-primary': '#fff2fa', '--text-muted': '#c8adbd', '--color-accent': '#ff5f9b', '--color-accent-ink': '#321020', '--color-signal': '#67dcff', '--scrollbar-thumb': '#493044', '--color-separator': '#493044', '--color-field-line': '#603a57', '--color-field-node': '#ff5f9b', '--atlas-moss': '#261622', '--atlas-paper': '#20131e', '--atlas-white': '#31222e' },
        light: { '--bg-primary': '#fff0f7', '--bg-secondary': '#fffaff', '--text-primary': '#281824', '--text-muted': '#705766', '--color-accent': '#c12f70', '--color-accent-ink': '#ffffff', '--color-signal': '#087b9e', '--scrollbar-thumb': '#e1cbd7', '--color-separator': '#ecd8e2', '--color-field-line': '#ecc5d8', '--color-field-node': '#c12f70', '--atlas-moss': '#f6deea', '--atlas-paper': '#fdf2f8', '--atlas-white': '#fffaff' }
    }
];

const hashSeed = (seed) => Array.from(seed).reduce((hash, character) => ((hash << 5) - hash) + character.charCodeAt(0) | 0, 0);
const createSeed = () => window.crypto?.getRandomValues ? window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36) : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
const readSeed = () => new URLSearchParams(window.location.search).get(PALETTE_QUERY_PARAM) || createSeed();

const applyPalette = (seed, isDark) => {
    const palette = palettes[Math.abs(hashSeed(seed)) % palettes.length][isDark ? 'dark' : 'light'];
    Object.entries(palette).forEach(([property, value]) => document.documentElement.style.setProperty(property, value));
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [paletteSeed, setPaletteSeed] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const nextIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        const seed = readSeed();

        setIsDark(nextIsDark);
        setPaletteSeed(seed);
        document.documentElement.classList.toggle('light', !nextIsDark);
        document.documentElement.classList.toggle('dark', nextIsDark);
        applyPalette(seed, nextIsDark);
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const updateDOM = () => {
            setIsDark(nextIsDark);
            document.documentElement.classList.toggle('light', !nextIsDark);
            document.documentElement.classList.toggle('dark', nextIsDark);
            localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
            applyPalette(paletteSeed, nextIsDark);
        };

        if (!document.startViewTransition || reduceMotion) {
            updateDOM();
            return;
        }

        document.startViewTransition(updateDOM);
    };

    const rerollPalette = () => {
        const seed = createSeed();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const updatePalette = () => {
            const url = new URL(window.location.href);
            url.searchParams.set(PALETTE_QUERY_PARAM, seed);
            window.history.replaceState({}, '', url);
            setPaletteSeed(seed);
            applyPalette(seed, isDark);
        };

        if (!document.startViewTransition || reduceMotion) {
            updatePalette();
            return;
        }

        document.startViewTransition(updatePalette);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, rerollPalette }}>
            {children}
        </ThemeContext.Provider>
    );
};
