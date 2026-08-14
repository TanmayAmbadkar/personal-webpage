import React from 'react';
import { Briefcase } from 'lucide-react';
import Section from './Section';
import experience from '../data/experience.json';

const companyLogos = {
    Stripe: {
        src: '/images/companies/stripe-logo.jpg',
        alt: 'Stripe logo',
        className: 'w-16'
    },
    'The Pennsylvania State University': {
        src: '/images/companies/penn-state-shield.png',
        alt: 'Penn State logo',
        className: 'w-14'
    },
    'Siemens Technology and Services': {
        src: '/images/companies/Siemens-Logo.png',
        alt: 'Siemens logo',
        className: 'w-16'
    }
};

const TimelineEntry = ({ icon: Icon, title, organization, period, description }) => (
    <article className="grid gap-4 border-t border-gray py-6 sm:grid-cols-[5rem_minmax(0,1fr)_10rem] sm:gap-6">
        <div className="company-logo-frame">
            <Icon className="company-logo-fallback" size={19} aria-hidden="true" />
            {companyLogos[organization] && (
                <img
                    src={companyLogos[organization].src}
                    alt={companyLogos[organization].alt}
                    className={`company-logo ${companyLogos[organization].className}`}
                    onLoad={(event) => { event.currentTarget.parentElement.querySelector('.company-logo-fallback').style.display = 'none'; }}
                    onError={(event) => { event.currentTarget.style.display = 'none'; }}
                />
            )}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-text">{title}</h3>
            <p className="mt-1 text-sm text-muted">{organization}</p>
            {description && (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                    {description.map((item) => <li key={item} className="before:mr-2 before:text-accent before:content-['-']">{item}</li>)}
                </ul>
            )}
        </div>
        <p className="text-sm font-medium text-muted sm:text-right">{period}</p>
    </article>
);

const AcademicTimeline = () => (
    <Section id="experience" title="Experience">
        <div className="max-w-4xl">
            <div className="border-b border-gray">
                {experience.map((entry) => (
                    <TimelineEntry key={`${entry.company}-${entry.period}`} icon={Briefcase} title={entry.role} organization={entry.company} period={entry.period} description={entry.description} />
                ))}
            </div>
        </div>
    </Section>
);

export default AcademicTimeline;
