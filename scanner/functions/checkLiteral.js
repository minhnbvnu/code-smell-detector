function checkLiteral(node) {
                if (node.regex) {
                    const pattern = node.regex.pattern;
                    const rawPattern = node.raw.slice(1, node.raw.lastIndexOf("/"));
                    const rawPatternStartRange = node.range[0] + 1;
                    const flags = node.regex.flags;
                    checkRegex(node, pattern, rawPattern, rawPatternStartRange, flags);
                }
            }