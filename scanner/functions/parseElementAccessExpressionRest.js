function parseElementAccessExpressionRest(pos, expression, questionDotToken) {
                        let argumentExpression;
                        if (token() === 23 /* CloseBracketToken */) {
                            argumentExpression = createMissingNode(79 /* Identifier */, 
                            /*reportAtCurrentPosition*/
                            true, Diagnostics.An_element_access_expression_should_take_an_argument);
                        }
                        else {
                            const argument = allowInAnd(parseExpression);
                            if (isStringOrNumericLiteralLike(argument)) {
                                argument.text = internIdentifier(argument.text);
                            }
                            argumentExpression = argument;
                        }
                        parseExpected(23 /* CloseBracketToken */);
                        const indexedAccess = questionDotToken || tryReparseOptionalChain(expression) ? factoryCreateElementAccessChain(expression, questionDotToken, argumentExpression) : factoryCreateElementAccessExpression(expression, argumentExpression);
                        return finishNode(indexedAccess, pos);
                    }