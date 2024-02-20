function textSpanEndingAtNextToken(startNode2, previousTokenToFindNextEndToken) {
                return textSpan(startNode2, findNextToken(previousTokenToFindNextEndToken, previousTokenToFindNextEndToken.parent, sourceFile));
            }