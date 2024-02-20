function parseWhileStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(115 /* WhileKeyword */);
                        const openParenPosition = scanner2.getTokenPos();
                        const openParenParsed = parseExpected(20 /* OpenParenToken */);
                        const expression = allowInAnd(parseExpression);
                        parseExpectedMatchingBrackets(20 /* OpenParenToken */, 21 /* CloseParenToken */, openParenParsed, openParenPosition);
                        const statement = parseStatement();
                        return withJSDoc(finishNode(factoryCreateWhileStatement(expression, statement), pos), hasJSDoc);
                    }