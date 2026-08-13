import React, { useId, useState } from 'react';
import Section from './Section';
import { Shield, Target, GitMerge, ChevronDown, ChevronUp } from 'lucide-react';
import researchData from '../data/research.json';
import Collapsible from './Collapsible';

const iconMap = {
    Target: Target,
    Shield: Shield,
    GitMerge: GitMerge
};

const ResearchObjective = ({ title, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentId = useId();
    const ToggleIcon = isOpen ? ChevronUp : ChevronDown;

    return (
        <div className="border-t border-gray last:border-b">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full flex items-center gap-4 py-5 text-left hover:text-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-inset transition-colors"
            >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                    <Icon size={21} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-text flex-1 leading-snug">{title}</h3>
                <ToggleIcon size={22} className="text-muted shrink-0" />
            </button>

            <Collapsible
                id={contentId}
                isOpen={isOpen}
                className="pb-6 pl-4 sm:pl-14 lg:pl-14 border-l-2 border-accent/30 space-y-4"
            >
                {children}
            </Collapsible>
        </div>
    );
};

const ResearchBlock = ({ title, content }) => (
    <div className="py-1">
        <h4 className="text-sm font-semibold text-accent mb-2">
            {title}
        </h4>
        <div
            className="text-muted leading-relaxed text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    </div>
);

const Research = () => {
    return (
        <Section id="research" title="Research Directions">
            <div className="max-w-3xl space-y-5 mb-12">
                {researchData.intro.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-muted leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="max-w-4xl">
                {researchData.objectives.map((obj, index) => (
                    <ResearchObjective
                    key={obj.title}
                    title={`0${index + 1} / ${obj.title.replace(/^Objective \d+: /, '')}`}
                    icon={iconMap[obj.icon]}
                >
                    {obj.blocks.map((block, bIdx) => (
                        <ResearchBlock
                            key={bIdx}
                            title={block.title}
                            content={block.content}
                        />
                    ))}
                    </ResearchObjective>
                ))}
            </div>
        </Section>
    );
};

export default Research;
