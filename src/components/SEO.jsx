import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, image, url }) => {
    const location = useLocation();

    useEffect(() => {
        // Update title
        if (title) {
            document.title = title;
        }

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = description || "Tanmay Ambadkar's personal portfolio website. PhD student at Penn State University specializing in Reinforcement Learning and Formal Methods.";

        // Update meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = keywords || "Tanmay Ambadkar, Reinforcement Learning, Safe RL, Multi-Objective RL, Formal Methods, PhD Student, Penn State";

        // Update Open Graph tags
        const ogTags = [
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: url || window.location.href },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: image || 'https://ambadkar.com/files/profile.jpg' }
        ];

        ogTags.forEach(tag => {
            let element = document.querySelector(`meta[property="${tag.property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', tag.property);
                document.head.appendChild(element);
            }
            element.content = tag.content;
        });

        // Update Twitter tags
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image || 'https://ambadkar.com/files/profile.jpg' }
        ];

        twitterTags.forEach(tag => {
            let element = document.querySelector(`meta[name="${tag.name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.name = tag.name;
                document.head.appendChild(element);
            }
            element.content = tag.content;
        });

        // Update Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = url || `https://ambadkar.com${location.pathname}`;

    }, [title, description, keywords, image, url, location]);

    return null;
};

export default SEO;
