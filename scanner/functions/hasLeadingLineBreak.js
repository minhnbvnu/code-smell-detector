function hasLeadingLineBreak(node, text) {
            const start = node.getFullStart();
            const end = node.getStart();
            for (let i = start; i < end; i++) {
                if (text.charCodeAt(i) === 10 /* lineFeed */)
                    return true;
            }
            return false;
        }