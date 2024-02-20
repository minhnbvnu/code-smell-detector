function parseThrowStatement() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        parseExpected(109 /* ThrowKeyword */);
                        let expression = scanner2.hasPrecedingLineBreak() ? void 0 : allowInAnd(parseExpression);
                        if (expression === void 0) {
                            identifierCount++;
                            expression = finishNode(factoryCreateIdentifier(""), getNodePos());
                        }
                        if (!tryParseSemicolon()) {
                            parseErrorForMissingSemicolonAfter(expression);
                        }
                        return withJSDoc(finishNode(factory2.createThrowStatement(expression), pos), hasJSDoc);
                    }