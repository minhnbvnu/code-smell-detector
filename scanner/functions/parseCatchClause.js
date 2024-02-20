function parseCatchClause() {
                        const pos = getNodePos();
                        parseExpected(83 /* CatchKeyword */);
                        let variableDeclaration;
                        if (parseOptional(20 /* OpenParenToken */)) {
                            variableDeclaration = parseVariableDeclaration();
                            parseExpected(21 /* CloseParenToken */);
                        }
                        else {
                            variableDeclaration = void 0;
                        }
                        const block = parseBlock(
                        /*ignoreMissingOpenBrace*/
                        false);
                        return finishNode(factory2.createCatchClause(variableDeclaration, block), pos);
                    }