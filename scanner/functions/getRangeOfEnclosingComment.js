function getRangeOfEnclosingComment(sourceFile, position, precedingToken, tokenAtPosition = getTokenAtPosition(sourceFile, position)) {
            const jsdoc = findAncestor(tokenAtPosition, isJSDoc);
            if (jsdoc)
                tokenAtPosition = jsdoc.parent;
            const tokenStart = tokenAtPosition.getStart(sourceFile);
            if (tokenStart <= position && position < tokenAtPosition.getEnd()) {
                return void 0;
            }
            precedingToken = precedingToken === null ? void 0 : precedingToken === void 0 ? findPrecedingToken(position, sourceFile) : precedingToken;
            const trailingRangesOfPreviousToken = precedingToken && getTrailingCommentRanges(sourceFile.text, precedingToken.end);
            const leadingCommentRangesOfNextToken = getLeadingCommentRangesOfNode(tokenAtPosition, sourceFile);
            const commentRanges = concatenate(trailingRangesOfPreviousToken, leadingCommentRangesOfNextToken);
            return commentRanges && find(commentRanges, (range) => rangeContainsPositionExclusive(range, position) || // The end marker of a single-line comment does not include the newline character.
                // With caret at `^`, in the following case, we are inside a comment (^ denotes the cursor position):
                //
                //    // asdf   ^\n
                //
                // But for closed multi-line comments, we don't want to be inside the comment in the following case:
                //
                //    /* asdf */^
                //
                // However, unterminated multi-line comments *do* contain their end.
                //
                // Internally, we represent the end of the comment at the newline and closing '/', respectively.
                //
                position === range.end && (range.kind === 2 /* SingleLineCommentTrivia */ || position === sourceFile.getFullWidth()));
        }