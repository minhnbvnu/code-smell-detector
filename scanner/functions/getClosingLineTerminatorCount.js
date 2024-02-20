function getClosingLineTerminatorCount(parentNode, lastChild, format, childrenTextRange) {
                if (format & 2 /* PreserveLines */ || preserveSourceNewlines) {
                    if (format & 65536 /* PreferNewLine */) {
                        return 1;
                    }
                    if (lastChild === void 0) {
                        return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
                    }
                    if (currentSourceFile && parentNode && !positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                        if (preserveSourceNewlines) {
                            const end = childrenTextRange && !positionIsSynthesized(childrenTextRange.end) ? childrenTextRange.end : lastChild.end;
                            return getEffectiveLines((includeComments) => getLinesBetweenPositionAndNextNonWhitespaceCharacter(end, parentNode.end, currentSourceFile, includeComments));
                        }
                        return rangeEndPositionsAreOnSameLine(parentNode, lastChild, currentSourceFile) ? 0 : 1;
                    }
                    if (synthesizedNodeStartsOnNewLine(lastChild, format)) {
                        return 1;
                    }
                }
                if (format & 1 /* MultiLine */ && !(format & 131072 /* NoTrailingNewLine */)) {
                    return 1;
                }
                return 0;
            }