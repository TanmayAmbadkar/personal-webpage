import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, FileText, GraduationCap, BookOpen, Briefcase, User, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import profileData from '../data/profile.json';
import { useTheme } from '../context/ThemeContext';
import { useScroll } from '../context/ScrollContext';

const iconMap = {
    Mail: <Mail size={20} />,
    Linkedin: <Linkedin size={20} />,
    Github: <Github size={20} />,
    GraduationCap: <GraduationCap size={20} />,
    FileText: <FileText size={20} />
};

const Sidebar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const { lenis } = useScroll();
    const { isDark, toggleTheme } = useTheme();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px'
            }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const handleNavClick = (to) => {
        lenis?.scrollTo(`#${to}`, { offset: -50, duration: reduceMotion ? 0 : 1.2 });
        setIsOpen(false);
    };

    const navItems = [
        { name: 'About', to: 'about', icon: <User size={20} /> },
        { name: 'Research', to: 'research', icon: <BookOpen size={20} /> },
        { name: 'Publications', to: 'publications', icon: <FileText size={20} /> },
        { name: 'Experience', to: 'experience', icon: <Briefcase size={20} /> },
        { name: 'Education', to: 'education', icon: <GraduationCap size={20} /> },
        { name: 'Teaching', to: 'teaching', icon: <BookOpen size={20} /> },
    ];

    // Mobile Header
    if (isMobile) {
        return (
            <>
                <div className="fixed top-0 left-0 right-0 h-16 bg-primary/75 backdrop-blur-xl border-b border-gray flex items-center justify-between px-6 z-50 transition-colors duration-300">
                    <span className="font-bold text-lg text-text">{profileData.name}</span>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 rounded-md text-muted hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={isOpen}
                            aria-controls="mobile-navigation"
                            className="p-2 rounded-md text-muted hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            id="mobile-navigation"
                            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                            transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.32 }}
                            className="fixed inset-0 top-16 bg-primary/95 backdrop-blur-xl z-40 overflow-y-auto"
                        >
                            <nav className="flex flex-col p-6 gap-2">
                                {navItems.map((item) => (
                                    <button
                                        type="button"
                                        key={item.name}
                                        onClick={() => handleNavClick(item.to)}
                                        aria-current={activeSection === item.to ? 'true' : undefined}
                                        className={`flex items-center gap-4 px-4 py-4 rounded-lg text-lg font-medium active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors ${activeSection === item.to
                                            ? 'text-accent bg-accent/5'
                                            : 'text-muted hover:text-text hover:bg-accent/5'
                                            }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </button>
                                ))}

                                <div className="flex justify-center gap-6 mt-8 pt-8 border-t border-gray">
                                    {profileData.socialLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted hover:text-accent p-2 rounded-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors"
                                            aria-label={link.name}
                                        >
                                            {iconMap[link.icon]}
                                        </a>
                                    ))}
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Desktop Sidebar
    return (
        <motion.div
            initial={reduceMotion ? { opacity: 1 } : { x: -100, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.42 }}
            className="fixed left-0 top-0 h-screen w-64 bg-primary/70 backdrop-blur-xl border-r border-gray flex flex-col justify-between py-6 z-50 transition-colors duration-300 overflow-y-auto"
        >
            <div className="flex flex-col items-center px-4 shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-accent/70 mb-4 shadow-lg shadow-accent/10">
                    <img src="/files/profile.jpg" alt={profileData.name} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl font-bold text-text text-center">{profileData.name}</h1>
                <p className="text-sm text-muted text-center mt-1">{profileData.role}</p>
            </div>

            <nav className="flex flex-col gap-1 px-4 my-6">
                {navItems.map((item) => (
                    <button
                        type="button"
                        key={item.name}
                        onClick={() => handleNavClick(item.to)}
                        aria-current={activeSection === item.to ? 'true' : undefined}
                        className={`relative flex items-center gap-4 border-l-2 border-transparent px-4 py-2.5 rounded-lg cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors group w-full text-left ${activeSection === item.to
                            ? 'bg-accent/5 text-accent border-accent'
                            : 'text-muted hover:text-text hover:bg-accent/5'
                            }`}
                    >
                        <span className={`transition-transform ${activeSection === item.to ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                    </button>
                ))}
            </nav>

            <div className="flex flex-col items-center gap-4 px-4 shrink-0">
                <div className="flex justify-center gap-1">
                    {profileData.socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-accent transition-colors p-1.5 hover:bg-accent/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded-full"
                            title={link.name}
                            aria-label={link.name}
                        >
                            {iconMap[link.icon]}
                        </a>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="relative flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary transition-colors text-sm font-medium overflow-hidden group"
                >
                    <div className="relative w-6 h-6">
                        <motion.div
                            initial={false}
                            animate={{
                                y: isDark ? 20 : 0,
                                opacity: isDark ? 0 : 1,
                                rotate: isDark ? 90 : 0
                            }}
                            transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Sun size={20} />
                        </motion.div>
                        <motion.div
                            initial={false}
                            animate={{
                                y: isDark ? 0 : -20,
                                opacity: isDark ? 1 : 0,
                                rotate: isDark ? 0 : -90
                            }}
                            transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Moon size={20} />
                        </motion.div>
                    </div>
                    <span className="relative z-10">
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
