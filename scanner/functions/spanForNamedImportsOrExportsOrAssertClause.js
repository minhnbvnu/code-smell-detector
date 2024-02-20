function spanForNamedImportsOrExportsOrAssertClause(node) {
                if (!node.elements.length) {
                    return void 0;
                }
                const openToken = findChildOfKind(node, 18 /* OpenBraceToken */, sourceFile);
                const closeToken = findChildOfKind(node, 19 /* CloseBraceToken */, sourceFile);
                if (!openToken || !closeToken || positionsAreOnSameLine(openToken.pos, closeToken.pos, sourceFile)) {
                    return void 0;
                }
                return spanBetweenTokens(openToken, closeToken, node, sourceFile, 
                /*autoCollapse*/
                false, 
                /*useFullStart*/
                false);
            }