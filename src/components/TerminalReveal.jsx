import React from 'react';

const TerminalReveal = ({
    as: Tag = 'span',
    children,
    className = '',
    delayOffset = 0,
}) => {
    const text = String(children);

    return (
        <Tag className={`terminal-reveal ${className}`.trim()} aria-label={text}>
            {Array.from(text).map((character, index) => (
                <span
                    key={`${character}-${index}`}
                    aria-hidden="true"
                    style={{ '--terminal-delay': `${delayOffset + index * 24}ms` }}
                >
                    {character === ' ' ? '\u00A0' : character}
                </span>
            ))}
        </Tag>
    );
};

export default TerminalReveal;
