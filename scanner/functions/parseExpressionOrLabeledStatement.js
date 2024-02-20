function parseExpressionOrLabeledStatement() {
                        const pos = getNodePos();
                        let hasJSDoc = hasPrecedingJSDocComment();
                        let node;
                        const hasParen = token() === 20 /* OpenParenToken */;
                        const expression = allowInAnd(parseExpression);
                        if (isIdentifier(expression) && parseOptional(58 /* ColonToken */)) {
                            node = factory2.createLabeledStatement(expression, parseStatement());
                        }
                        else {
                            if (!tryParseSemicolon()) {
                                parseErrorForMissingSemicolonAfter(expression);
                            }
                            node = factoryCreateExpressionStatement(expression);
                            if (hasParen) {
                                hasJSDoc = false;
                            }
                        }
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }