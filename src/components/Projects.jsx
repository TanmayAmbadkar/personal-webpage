import React from 'react';
import Section from './Section';
import { Github, ExternalLink, Folder } from 'lucide-react';
import projectsData from '../data/projects.json';

const ProjectCard = ({ title, description, links }) => (
    <div className="bg-secondary/30 backdrop-blur-sm border border-gray rounded-xl p-6 hover:border-accent/30 transition-all hover:-translate-y-1 duration-300 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <Folder size={20} />
            </div>
            <div className="flex gap-3">
                {links.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-text transition-colors"
                        title={link.name}
                    >
                        {link.name === 'Code' ? <Github size={18} /> : <ExternalLink size={18} />}
                    </a>
                ))}
            </div>
        </div>

        <h3 className="text-lg font-bold text-text mb-3">{title}</h3>
        <p className="text-sm text-muted/80 leading-relaxed mb-4 flex-grow">
            {description}
        </p>
    </div>
);

const Projects = () => {
    return (
        <Section id="projects" title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project, idx) => (
                    <ProjectCard key={idx} {...project} />
                ))}
            </div>
        </Section>
    );
};

export default Projects;
