function parseWithStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(116 /* WithKeyword */);
                        const openParenPosition = scanner2.getTokenPos();
                        const openParenParsed = parseExpected(20 /* OpenParenToken */);
                        const expression = allowInAnd(parseExpression);
                        parseExpectedMatchingBrackets(20 /* OpenParenToken */, 21 /* CloseParenToken */, openParenParsed, openParenPosition);
                        const statement = doInsideOfContext(33554432 /* InWithStatement */, parseStatement);
                        return withJSDoc(finishNode(factory2.createWithStatement(expression, statement), pos), hasJSDoc);
                    }