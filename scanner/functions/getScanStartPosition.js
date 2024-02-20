function getScanStartPosition(enclosingNode, originalRange, sourceFile) {
            const start = enclosingNode.getStart(sourceFile);
            if (start === originalRange.pos && enclosingNode.end === originalRange.end) {
                return start;
            }
            const precedingToken = findPrecedingToken(originalRange.pos, sourceFile);
            if (!precedingToken) {
                return enclosingNode.pos;
            }
            if (precedingToken.end >= originalRange.pos) {
                return enclosingNode.pos;
            }
            return precedingToken.end;
        }