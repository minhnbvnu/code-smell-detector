function spanForCallExpression(node) {
                if (!node.arguments.length) {
                    return void 0;
                }
                const openToken = findChildOfKind(node, 20 /* OpenParenToken */, sourceFile);
                const closeToken = findChildOfKind(node, 21 /* CloseParenToken */, sourceFile);
                if (!openToken || !closeToken || positionsAreOnSameLine(openToken.pos, closeToken.pos, sourceFile)) {
                    return void 0;
                }
                return spanBetweenTokens(openToken, closeToken, node, sourceFile, 
                /*autoCollapse*/
                false, 
                /*useFullStart*/
                true);
            }