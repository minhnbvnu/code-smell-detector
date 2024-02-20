function parseSwitchStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(107 /* SwitchKeyword */);
                        parseExpected(20 /* OpenParenToken */);
                        const expression = allowInAnd(parseExpression);
                        parseExpected(21 /* CloseParenToken */);
                        const caseBlock = parseCaseBlock();
                        return withJSDoc(finishNode(factory2.createSwitchStatement(expression, caseBlock), pos), hasJSDoc);
                    }