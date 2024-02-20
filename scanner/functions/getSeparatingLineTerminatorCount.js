function getSeparatingLineTerminatorCount(previousNode, nextNode, format) {
                if (format & 2 /* PreserveLines */ || preserveSourceNewlines) {
                    if (previousNode === void 0 || nextNode === void 0) {
                        return 0;
                    }
                    if (nextNode.kind === 11 /* JsxText */) {
                        return 0;
                    }
                    else if (currentSourceFile && !nodeIsSynthesized(previousNode) && !nodeIsSynthesized(nextNode)) {
                        if (preserveSourceNewlines && siblingNodePositionsAreComparable(previousNode, nextNode)) {
                            return getEffectiveLines((includeComments) => getLinesBetweenRangeEndAndRangeStart(previousNode, nextNode, currentSourceFile, includeComments));
                        }
                        else if (!preserveSourceNewlines && originalNodesHaveSameParent(previousNode, nextNode)) {
                            return rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode, currentSourceFile) ? 0 : 1;
                        }
                        return format & 65536 /* PreferNewLine */ ? 1 : 0;
                    }
                    else if (synthesizedNodeStartsOnNewLine(previousNode, format) || synthesizedNodeStartsOnNewLine(nextNode, format)) {
                        return 1;
                    }
                }
                else if (getStartsOnNewLine(nextNode)) {
                    return 1;
                }
                return format & 1 /* MultiLine */ ? 1 : 0;
            }