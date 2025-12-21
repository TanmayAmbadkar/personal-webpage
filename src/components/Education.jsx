import React from 'react';
import Section from './Section';
import educationData from '../data/education.json';

const EducationItem = ({ school, degree, period, gpa, details }) => (
    <div className="relative pl-8 pb-12 border-l border-gray last:pb-0 last:border-l-0">
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
            <div>
                <h3 className="text-xl font-bold text-text leading-tight">{school}</h3>
                <p className="text-lg text-accent mt-1">{degree}</p>
            </div>
            <span className="text-sm font-mono text-muted/80 bg-white/5 px-3 py-1 rounded whitespace-nowrap self-start">
                {period}
            </span>
        </div>

        {gpa && <p className="text-sm text-muted mb-3">GPA: <span className="text-text font-medium">{gpa}</span></p>}

        {details && (
            <ul className="space-y-2 mt-3">
                {details.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted/80 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const Education = () => {
    return (
        <Section id="education" title="Education">
            <div className="mt-8">
                {educationData.map((edu, index) => (
                    <EducationItem
                        key={index}
                        {...edu}
                    />
                ))}
            </div>
        </Section>
    );
};

export default Education;
