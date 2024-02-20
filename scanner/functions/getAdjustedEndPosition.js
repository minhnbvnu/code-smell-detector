function getAdjustedEndPosition(sourceFile, node, options) {
            var _a2;
            const { end } = node;
            const { trailingTriviaOption } = options;
            if (trailingTriviaOption === 0 /* Exclude */) {
                return end;
            }
            if (trailingTriviaOption === 1 /* ExcludeWhitespace */) {
                const comments = concatenate(getTrailingCommentRanges(sourceFile.text, end), getLeadingCommentRanges(sourceFile.text, end));
                const realEnd = (_a2 = comments == null ? void 0 : comments[comments.length - 1]) == null ? void 0 : _a2.end;
                if (realEnd) {
                    return realEnd;
                }
                return end;
            }
            const multilineEndPosition = getEndPositionOfMultilineTrailingComment(sourceFile, node, options);
            if (multilineEndPosition) {
                return multilineEndPosition;
            }
            const newEnd = skipTrivia(sourceFile.text, end, 
            /*stopAfterLineBreak*/
            true);
            return newEnd !== end && (trailingTriviaOption === 2 /* Include */ || isLineBreak(sourceFile.text.charCodeAt(newEnd - 1))) ? newEnd : end;
        }