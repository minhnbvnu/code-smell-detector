function endPositionToDeleteNodeInList(sourceFile, node, prevNode, nextNode) {
            const end = startPositionToDeleteNodeInList(sourceFile, nextNode);
            if (prevNode === void 0 || positionsAreOnSameLine(getAdjustedEndPosition(sourceFile, node, {}), end, sourceFile)) {
                return end;
            }
            const token = findPrecedingToken(nextNode.getStart(sourceFile), sourceFile);
            if (isSeparator(node, token)) {
                const prevToken = findPrecedingToken(node.getStart(sourceFile), sourceFile);
                if (isSeparator(prevNode, prevToken)) {
                    const pos = skipTrivia(sourceFile.text, token.getEnd(), 
                    /*stopAfterLineBreak*/
                    true, 
                    /*stopAtComments*/
                    true);
                    if (positionsAreOnSameLine(prevToken.getStart(sourceFile), token.getStart(sourceFile), sourceFile)) {
                        return isLineBreak(sourceFile.text.charCodeAt(pos - 1)) ? pos - 1 : pos;
                    }
                    if (isLineBreak(sourceFile.text.charCodeAt(pos))) {
                        return pos;
                    }
                }
            }
            return end;
        }