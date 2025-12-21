/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "var(--bg-primary)",
                secondary: "var(--bg-secondary)",
                accent: "var(--color-accent)",
                text: "var(--text-primary)",
                muted: "var(--text-muted)",
                separator: "var(--color-separator)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
