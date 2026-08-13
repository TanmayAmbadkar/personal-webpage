import React, { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const Collapsible = ({ isOpen, id, children, className = "" }) => {
    const reduceMotion = useReducedMotion();
    const contentRef = useRef(null);
    const frameRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [height, setHeight] = useState(isOpen ? 'auto' : 0);

    useLayoutEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        }
    }, [isOpen]);

    useLayoutEffect(() => {
        if (!shouldRender) {
            return undefined;
        }

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        if (reduceMotion) {
            setHeight(isOpen ? 'auto' : 0);
            if (!isOpen) {
                setShouldRender(false);
            }
            return undefined;
        }

        const content = contentRef.current;
        if (!content) {
            return undefined;
        }

        if (isOpen) {
            setHeight(0);
            frameRef.current = requestAnimationFrame(() => {
                setHeight(content.scrollHeight);
            });
        } else {
            setHeight(content.scrollHeight);
            frameRef.current = requestAnimationFrame(() => {
                setHeight(0);
            });
        }

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [isOpen, reduceMotion, shouldRender]);

    if (!shouldRender) {
        return null;
    }

    const handleTransitionEnd = (event) => {
        if (event.target !== event.currentTarget || event.propertyName !== 'height') {
            return;
        }

        if (isOpen) {
            setHeight('auto');
        } else {
            setShouldRender(false);
        }
    };

    return (
        <div
            id={id}
            className="overflow-hidden"
            style={{
                height,
                opacity: isOpen ? 1 : 0,
                transition: reduceMotion
                    ? 'none'
                    : 'height 200ms var(--ease-out), opacity 200ms var(--ease-out)'
            }}
            onTransitionEnd={handleTransitionEnd}
        >
            <div ref={contentRef} className={className}>
                {children}
            </div>
        </div>
    );
};

export default Collapsible;
