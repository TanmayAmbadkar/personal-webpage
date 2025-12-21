import React from 'react';
import Section from './Section';
import experienceData from '../data/experience.json';

const ExperienceItem = ({ role, company, period, description }) => (
    <div className="mb-8 bg-white/5 p-6 rounded-xl border border-gray hover:border-accent/20 transition-all">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
            <div>
                <h3 className="text-xl font-bold text-text leading-tight">{role}</h3>
                <p className="text-accent mt-1">{company}</p>
            </div>
            <span className="text-sm font-mono text-muted bg-white/5 px-3 py-1 rounded whitespace-nowrap self-start">
                {period}
            </span>
        </div>
        <ul className="space-y-3 mt-4">
            {description.map((item, idx) => (
                <li key={idx} className="text-sm text-muted/80 flex items-start gap-3">
                    {/* Fixed Bullet Alignment */}
                    <span className="text-accent mt-[0.4em] shrink-0 text-lg leading-none">•</span>
                    <span className="leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const Experience = () => {
    return (
        <Section id="experience" title="Work Experience">
            {experienceData.map((exp, index) => (
                <ExperienceItem
                    key={index}
                    {...exp}
                />
            ))}
        </Section>
    );
};

export default Experience;
