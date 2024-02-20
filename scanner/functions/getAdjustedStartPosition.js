function getAdjustedStartPosition(sourceFile, node, options, hasTrailingComment = false) {
            var _a2, _b;
            const { leadingTriviaOption } = options;
            if (leadingTriviaOption === 0 /* Exclude */) {
                return node.getStart(sourceFile);
            }
            if (leadingTriviaOption === 3 /* StartLine */) {
                const startPos = node.getStart(sourceFile);
                const pos = getLineStartPositionForPosition(startPos, sourceFile);
                return rangeContainsPosition(node, pos) ? pos : startPos;
            }
            if (leadingTriviaOption === 2 /* JSDoc */) {
                const JSDocComments = getJSDocCommentRanges(node, sourceFile.text);
                if (JSDocComments == null ? void 0 : JSDocComments.length) {
                    return getLineStartPositionForPosition(JSDocComments[0].pos, sourceFile);
                }
            }
            const fullStart = node.getFullStart();
            const start = node.getStart(sourceFile);
            if (fullStart === start) {
                return start;
            }
            const fullStartLine = getLineStartPositionForPosition(fullStart, sourceFile);
            const startLine = getLineStartPositionForPosition(start, sourceFile);
            if (startLine === fullStartLine) {
                return leadingTriviaOption === 1 /* IncludeAll */ ? fullStart : start;
            }
            if (hasTrailingComment) {
                const comment = ((_a2 = getLeadingCommentRanges(sourceFile.text, fullStart)) == null ? void 0 : _a2[0]) || ((_b = getTrailingCommentRanges(sourceFile.text, fullStart)) == null ? void 0 : _b[0]);
                if (comment) {
                    return skipTrivia(sourceFile.text, comment.end, 
                    /*stopAfterLineBreak*/
                    true, 
                    /*stopAtComments*/
                    true);
                }
            }
            const nextLineStart = fullStart > 0 ? 1 : 0;
            let adjustedStartPosition = getStartPositionOfLine(getLineOfLocalPosition(sourceFile, fullStartLine) + nextLineStart, sourceFile);
            adjustedStartPosition = skipWhitespacesAndLineBreaks(sourceFile.text, adjustedStartPosition);
            return getStartPositionOfLine(getLineOfLocalPosition(sourceFile, adjustedStartPosition), sourceFile);
        }