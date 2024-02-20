function nodeContainsPosition(node, start, end) {
                end != null ? end : end = node.getEnd();
                if (end < position) {
                    return false;
                }
                start != null ? start : start = allowPositionInLeadingTrivia ? node.getFullStart() : node.getStart(sourceFile, 
                /*includeJsDoc*/
                true);
                if (start > position) {
                    return false;
                }
                if (position < end || position === end && (node.kind === 1 /* EndOfFileToken */ || includeEndPosition)) {
                    return true;
                }
                else if (includePrecedingTokenAtEndPosition && end === position) {
                    const previousToken = findPrecedingToken(position, sourceFile, node);
                    if (previousToken && includePrecedingTokenAtEndPosition(previousToken)) {
                        foundToken = previousToken;
                        return true;
                    }
                }
                return false;
            }