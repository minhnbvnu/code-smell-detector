function spanForNode(hintSpanNode, autoCollapse = false, useFullStart = true, open = 18 /* OpenBraceToken */, close = open === 18 /* OpenBraceToken */ ? 19 /* CloseBraceToken */ : 23 /* CloseBracketToken */) {
                const openToken = findChildOfKind(n, open, sourceFile);
                const closeToken = findChildOfKind(n, close, sourceFile);
                return openToken && closeToken && spanBetweenTokens(openToken, closeToken, hintSpanNode, sourceFile, autoCollapse, useFullStart);
            }