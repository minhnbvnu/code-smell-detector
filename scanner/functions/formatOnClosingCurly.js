function formatOnClosingCurly(position, sourceFile, formatContext) {
            const precedingToken = findImmediatelyPrecedingTokenOfKind(position, 19 /* CloseBraceToken */, sourceFile);
            return formatNodeLines(findOutermostNodeWithinListLevel(precedingToken), sourceFile, formatContext, 5 /* FormatOnClosingCurlyBrace */);
        }