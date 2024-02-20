function parseDoStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(90 /* DoKeyword */);
                        const statement = parseStatement();
                        parseExpected(115 /* WhileKeyword */);
                        const openParenPosition = scanner2.getTokenPos();
                        const openParenParsed = parseExpected(20 /* OpenParenToken */);
                        const expression = allowInAnd(parseExpression);
                        parseExpectedMatchingBrackets(20 /* OpenParenToken */, 21 /* CloseParenToken */, openParenParsed, openParenPosition);
                        parseOptional(26 /* SemicolonToken */);
                        return withJSDoc(finishNode(factory2.createDoStatement(statement, expression), pos), hasJSDoc);
                    }