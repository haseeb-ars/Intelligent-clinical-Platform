import React from 'react';

/**
 * Converts a markdown-formatted clinical summary into React elements.
 * Handles headers, bullet points, bold text, and line breaks.
 */
export function formatSummary(markdownText) {
    if (!markdownText) return null;

    const lines = markdownText.split('\n');
    const elements = [];
    let listItems = [];
    let listKey = 0;

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                React.createElement('ul', { key: `list-${listKey++}`, className: 'summary-list' }, ...listItems)
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        if (!trimmed) {
            flushList();
            return;
        }

        // H2: ## Header
        if (trimmed.startsWith('## ')) {
            flushList();
            elements.push(
                React.createElement('h3', { key: `h2-${index}`, className: 'summary-section-title' },
                    trimmed.replace('## ', '')
                )
            );
            return;
        }

        // H1: # Header
        if (trimmed.startsWith('# ')) {
            flushList();
            elements.push(
                React.createElement('h2', { key: `h1-${index}`, className: 'summary-main-title' },
                    trimmed.replace('# ', '')
                )
            );
            return;
        }

        // Horizontal rule
        if (trimmed === '---' || trimmed === '***') {
            flushList();
            elements.push(React.createElement('hr', { key: `hr-${index}`, className: 'summary-divider' }));
            return;
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.replace(/^[-*]\s+/, '');
            listItems.push(
                React.createElement('li', { key: `li-${index}` }, formatInlineMarkdown(content))
            );
            return;
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
            const content = trimmed.replace(/^\d+\.\s+/, '');
            listItems.push(
                React.createElement('li', { key: `li-${index}` }, formatInlineMarkdown(content))
            );
            return;
        }

        // Regular paragraph
        flushList();
        elements.push(
            React.createElement('p', { key: `p-${index}`, className: 'summary-paragraph' },
                formatInlineMarkdown(trimmed)
            )
        );
    });

    flushList();
    return elements;
}

/**
 * Formats inline markdown: **bold**, *italic*, `code`
 */
function formatInlineMarkdown(text) {
    const parts = [];
    let remaining = text;
    let keyCounter = 0;

    while (remaining.length > 0) {
        // Bold: **text**
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        if (boldMatch) {
            const idx = remaining.indexOf(boldMatch[0]);
            if (idx > 0) parts.push(remaining.slice(0, idx));
            parts.push(React.createElement('strong', { key: `b-${keyCounter++}` }, boldMatch[1]));
            remaining = remaining.slice(idx + boldMatch[0].length);
            continue;
        }

        // Italic: *text*
        const italicMatch = remaining.match(/\*(.+?)\*/);
        if (italicMatch) {
            const idx = remaining.indexOf(italicMatch[0]);
            if (idx > 0) parts.push(remaining.slice(0, idx));
            parts.push(React.createElement('em', { key: `i-${keyCounter++}` }, italicMatch[1]));
            remaining = remaining.slice(idx + italicMatch[0].length);
            continue;
        }

        // Code: `text`
        const codeMatch = remaining.match(/`(.+?)`/);
        if (codeMatch) {
            const idx = remaining.indexOf(codeMatch[0]);
            if (idx > 0) parts.push(remaining.slice(0, idx));
            parts.push(React.createElement('code', { key: `c-${keyCounter++}` }, codeMatch[1]));
            remaining = remaining.slice(idx + codeMatch[0].length);
            continue;
        }

        parts.push(remaining);
        break;
    }

    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
}

export default formatSummary;
