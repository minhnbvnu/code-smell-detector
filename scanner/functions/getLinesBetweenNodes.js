function getLinesBetweenNodes(parent2, node1, node2) {
                if (getEmitFlags(parent2) & 262144 /* NoIndentation */) {
                    return 0;
                }
                parent2 = skipSynthesizedParentheses(parent2);
                node1 = skipSynthesizedParentheses(node1);
                node2 = skipSynthesizedParentheses(node2);
                if (getStartsOnNewLine(node2)) {
                    return 1;
                }
                if (currentSourceFile && !nodeIsSynthesized(parent2) && !nodeIsSynthesized(node1) && !nodeIsSynthesized(node2)) {
                    if (preserveSourceNewlines) {
                        return getEffectiveLines((includeComments) => getLinesBetweenRangeEndAndRangeStart(node1, node2, currentSourceFile, includeComments));
                    }
                    return rangeEndIsOnSameLineAsRangeStart(node1, node2, currentSourceFile) ? 0 : 1;
                }
                return 0;
            }