function parseReturnStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(105 /* ReturnKeyword */);
                        const expression = canParseSemicolon() ? void 0 : allowInAnd(parseExpression);
                        parseSemicolon();
                        return withJSDoc(finishNode(factory2.createReturnStatement(expression), pos), hasJSDoc);
                    }