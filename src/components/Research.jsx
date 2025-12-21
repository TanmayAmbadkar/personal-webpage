import React from 'react';
import Section from './Section';
import { Shield, Target, GitMerge, Zap, ChevronRight } from 'lucide-react';
import researchData from '../data/research.json';

const iconMap = {
    Target: Target,
    Shield: Shield,
    GitMerge: GitMerge
};

const ResearchObjective = ({ title, icon: Icon, children }) => (
    <div className="mb-12 last:mb-0">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
                <Icon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-text">{title}</h3>
        </div>
        <div className="pl-4 lg:pl-20 border-l-2 border-gray space-y-6">
            {children}
        </div>
    </div>
);

const ResearchBlock = ({ title, content }) => (
    <div className="bg-white/5 rounded-xl p-6 border border-gray hover:border-accent/20 transition-colors">
        <h4 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
            {title}
        </h4>
        <div
            className="text-muted/90 leading-relaxed text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    </div>
);

const NextStepsBlock = ({ title, items }) => (
    <div className="bg-gradient-to-r from-accent/10 to-transparent rounded-xl p-6 border border-accent/20">
        <h4 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
            <Zap size={20} /> {title}
        </h4>
        <ul className="space-y-4">
            {items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                    <ChevronRight className="text-accent mt-1 shrink-0" size={18} />
                    <div
                        className="text-muted/90"
                        dangerouslySetInnerHTML={{ __html: item }}
                    />
                </li>
            ))}
        </ul>
    </div>
);

const Research = () => {
    return (
        <Section id="research" title="Research Overview">
            <div className="space-y-8 mb-16">
                {researchData.intro.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-muted leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>

            {researchData.objectives.map((obj, idx) => (
                <ResearchObjective
                    key={idx}
                    title={obj.title}
                    icon={iconMap[obj.icon]}
                >
                    {obj.blocks.map((block, bIdx) => (
                        <ResearchBlock
                            key={bIdx}
                            title={block.title}
                            content={block.content}
                        />
                    ))}

                    {obj.nextSteps && (
                        <NextStepsBlock
                            title={obj.nextSteps.title}
                            items={obj.nextSteps.items}
                        />
                    )}
                </ResearchObjective>
            ))}
        </Section>
    );
};

export default Research;
