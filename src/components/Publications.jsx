import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import { FileText, Code, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import publicationsData from '../data/publications.json';
import Collapsible from './Collapsible';

const PublicationItem = ({ pub }) => {
    const [isOpen, setIsOpen] = useState(false);
    const abstractId = useId();

    return (
        <article className="py-7 border-t border-gray first:border-t-0">
            <h3 className="text-xl sm:text-2xl font-semibold text-text leading-snug mb-2">{pub.title}</h3>
            <p className="text-muted mb-2 text-sm leading-relaxed">{pub.authors}</p>
            <p className="inline-flex rounded-md border border-accent/20 bg-accent/5 px-2.5 py-1 text-accent text-xs font-medium mb-5">{pub.venue}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
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
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors"
                            >
                                <Icon size={14} />
                                {link.name}
                                <ExternalLink size={12} aria-hidden="true" />
                            </Link>
                        );
                    }

                    return (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors"
                        >
                            <Icon size={14} />
                            {link.name}
                            <ExternalLink size={12} aria-hidden="true" />
                        </a>
                    );
                })}
            </div>

            {pub.abstract && (
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-controls={abstractId}
                        className="inline-flex items-center gap-2 rounded-md text-sm text-muted hover:text-text active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors"
                    >
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <span className="border-b border-dashed border-muted hover:border-text">
                            {isOpen ? 'Hide Abstract' : 'View Abstract'}
                        </span>
                    </button>
                    <Collapsible id={abstractId} isOpen={isOpen}>
                        <p className="mt-4 max-w-3xl text-sm text-muted leading-relaxed pl-4 border-l-2 border-accent/30">
                            {pub.abstract}
                        </p>
                    </Collapsible>
                </div>
            )}
        </article>
    );
};

const Publications = () => {
    return (
        <Section id="publications" title="Publications">
            <div className="max-w-4xl">
                {publicationsData.map((pub, index) => (
                    <PublicationItem key={index} pub={pub} />
                ))}
            </div>
        </Section>
    );
};

export default Publications;
