function getLeadingLineTerminatorCount(parentNode, firstChild, format) {
                if (format & 2 /* PreserveLines */ || preserveSourceNewlines) {
                    if (format & 65536 /* PreferNewLine */) {
                        return 1;
                    }
                    if (firstChild === void 0) {
                        return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
                    }
                    if (firstChild.pos === nextListElementPos) {
                        return 0;
                    }
                    if (firstChild.kind === 11 /* JsxText */) {
                        return 0;
                    }
                    if (currentSourceFile && parentNode && !positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(firstChild) && (!firstChild.parent || getOriginalNode(firstChild.parent) === getOriginalNode(parentNode))) {
                        if (preserveSourceNewlines) {
                            return getEffectiveLines((includeComments) => getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(firstChild.pos, parentNode.pos, currentSourceFile, includeComments));
                        }
                        return rangeStartPositionsAreOnSameLine(parentNode, firstChild, currentSourceFile) ? 0 : 1;
                    }
                    if (synthesizedNodeStartsOnNewLine(firstChild, format)) {
                        return 1;
                    }
                }
                return format & 1 /* MultiLine */ ? 1 : 0;
            }