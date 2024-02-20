function functionSpan(node, body, sourceFile) {
            const openToken = tryGetFunctionOpenToken(node, body, sourceFile);
            const closeToken = findChildOfKind(body, 19 /* CloseBraceToken */, sourceFile);
            return openToken && closeToken && spanBetweenTokens(openToken, closeToken, node, sourceFile, 
            /*autoCollapse*/
            node.kind !== 216 /* ArrowFunction */);
        }