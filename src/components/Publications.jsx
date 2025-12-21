import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import { ExternalLink, FileText, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import publicationsData from '../data/publications.json';

const PublicationItem = ({ pub }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-8 p-6 rounded-xl bg-white/5 border border-gray hover:border-accent/20 transition-all">
            <h3 className="text-xl font-bold text-text mb-2">{pub.title}</h3>
            <p className="text-muted mb-2 text-sm">{pub.authors}</p>
            <p className="text-accent text-sm font-medium mb-4">{pub.venue}</p>

            <div className="flex gap-3 mb-4">
                {pub.links.map((link, idx) => {
                    const isInternal = link.url.startsWith('/');
                    const Icon = link.name === 'Code' ? Code : FileText;

                    if (isInternal) {
                        return (
                            <Link
                                key={idx}
                                to={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-text hover:bg-accent hover:text-primary transition-colors border border-gray"
                            >
                                <Icon size={14} />
                                {link.name}
                            </Link>
                        );
                    }

                    return (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-text hover:bg-accent hover:text-primary transition-colors border border-gray"
                        >
                            <Icon size={14} />
                            {link.name}
                        </a>
                    );
                })}
            </div>

            {pub.abstract && (
                <div className="mt-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors focus:outline-none"
                    >
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <span className="border-b border-dashed border-muted hover:border-text">
                            {isOpen ? 'Hide Abstract' : 'View Abstract'}
                        </span>
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="mt-3 text-sm text-muted/80 leading-relaxed pl-4 border-l-2 border-gray pt-2">
                                    {pub.abstract}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

const Publications = () => {
    return (
        <Section id="publications" title="Publications">
            <div className="space-y-4">
                {publicationsData.map((pub, index) => (
                    <PublicationItem key={index} pub={pub} />
                ))}
            </div>
        </Section>
    );
};

export default Publications;
