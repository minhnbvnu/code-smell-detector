function parseIfStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(99 /* IfKeyword */);
                        const openParenPosition = scanner2.getTokenPos();
                        const openParenParsed = parseExpected(20 /* OpenParenToken */);
                        const expression = allowInAnd(parseExpression);
                        parseExpectedMatchingBrackets(20 /* OpenParenToken */, 21 /* CloseParenToken */, openParenParsed, openParenPosition);
                        const thenStatement = parseStatement();
                        const elseStatement = parseOptional(91 /* ElseKeyword */) ? parseStatement() : void 0;
                        return withJSDoc(finishNode(factoryCreateIfStatement(expression, thenStatement, elseStatement), pos), hasJSDoc);
                    }