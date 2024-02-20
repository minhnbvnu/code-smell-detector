function formatOnSemicolon(position, sourceFile, formatContext) {
            const semicolon = findImmediatelyPrecedingTokenOfKind(position, 26 /* SemicolonToken */, sourceFile);
            return formatNodeLines(findOutermostNodeWithinListLevel(semicolon), sourceFile, formatContext, 3 /* FormatOnSemicolon */);
        }