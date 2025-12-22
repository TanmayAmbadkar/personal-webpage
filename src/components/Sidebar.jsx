import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, FileText, GraduationCap, BookOpen, Briefcase, Code, User, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import profileData from '../data/profile.json';

const iconMap = {
    Mail: <Mail size={20} />,
    Linkedin: <Linkedin size={20} />,
    Github: <Github size={20} />,
    GraduationCap: <GraduationCap size={20} />,
    FileText: <FileText size={20} />
};

const Sidebar = ({ isDark, toggleTheme }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navItems = [
        { name: 'About', to: 'about', icon: <User size={20} /> },
        { name: 'Research', to: 'research', icon: <BookOpen size={20} /> },
        { name: 'Publications', to: 'publications', icon: <FileText size={20} /> },
        { name: 'Education', to: 'education', icon: <GraduationCap size={20} /> },
        { name: 'Experience', to: 'experience', icon: <Briefcase size={20} /> },
        { name: 'Projects', to: 'projects', icon: <Code size={20} /> },
    ];

    // Mobile Header
    if (isMobile) {
        return (
            <>
                <div className="fixed top-0 left-0 right-0 h-16 bg-primary/80 backdrop-blur-md border-b border-gray flex items-center justify-between px-6 z-50 transition-colors duration-300">
                    <span className="font-bold text-lg text-text">{profileData.name}</span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-muted hover:text-accent transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-muted hover:text-accent transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 top-16 bg-primary z-40 overflow-y-auto"
                        >
                            <nav className="flex flex-col p-6 gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        spy={true}
                                        smooth={true}
                                        offset={-80}
                                        duration={500}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 px-4 py-4 text-muted hover:text-text hover:bg-accent/5 rounded-lg text-lg font-medium transition-colors"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                ))}

                                <div className="flex justify-center gap-6 mt-8 pt-8 border-t border-gray">
                                    {profileData.socialLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted hover:text-accent p-2 transition-colors"
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
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-0 h-screen w-64 bg-secondary/30 backdrop-blur-lg border-r border-gray flex flex-col justify-between py-6 z-50 transition-colors duration-300 overflow-y-auto"
        >
            <div className="flex flex-col items-center px-4 shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-accent mb-4 shadow-lg shadow-accent/20">
                    <img src="/files/profile.jpg" alt={profileData.name} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl font-bold text-text text-center">{profileData.name}</h1>
                <p className="text-sm text-muted text-center mt-1">{profileData.role}</p>
            </div>

            <nav className="flex flex-col gap-1 px-4 my-6">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.to}
                        spy={true}
                        smooth="easeInOutQuart"
                        offset={-50}
                        duration={900}
                        activeClass="bg-accent/10 text-accent border-l-2 border-accent"
                        className="flex items-center gap-4 px-4 py-3 text-muted hover:text-text hover:bg-accent/5 rounded-lg cursor-pointer transition-all group"
                    >
                        <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </Link>
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
                            className="text-muted hover:text-accent transition-colors p-1.5 hover:bg-accent/5 rounded-full"
                            title={link.name}
                        >
                            {iconMap[link.icon]}
                        </a>
                    ))}
                </div>

                <button
                    onClick={toggleTheme}
                    className="relative flex items-center justify-center w-full gap-2 px-4 py-3 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium overflow-hidden group"
                >
                    <div className="relative w-6 h-6">
                        <motion.div
                            initial={false}
                            animate={{
                                y: isDark ? 20 : 0,
                                opacity: isDark ? 0 : 1,
                                rotate: isDark ? 90 : 0
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
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
                            transition={{ duration: 0.5, ease: "easeInOut" }}
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
