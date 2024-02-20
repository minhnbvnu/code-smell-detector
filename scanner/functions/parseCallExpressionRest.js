function parseCallExpressionRest(pos, expression) {
                        while (true) {
                            expression = parseMemberExpressionRest(pos, expression, 
                            /*allowOptionalChain*/
                            true);
                            let typeArguments;
                            const questionDotToken = parseOptionalToken(28 /* QuestionDotToken */);
                            if (questionDotToken) {
                                typeArguments = tryParse(parseTypeArgumentsInExpression);
                                if (isTemplateStartOfTaggedTemplate()) {
                                    expression = parseTaggedTemplateRest(pos, expression, questionDotToken, typeArguments);
                                    continue;
                                }
                            }
                            if (typeArguments || token() === 20 /* OpenParenToken */) {
                                if (!questionDotToken && expression.kind === 230 /* ExpressionWithTypeArguments */) {
                                    typeArguments = expression.typeArguments;
                                    expression = expression.expression;
                                }
                                const argumentList = parseArgumentList();
                                const callExpr = questionDotToken || tryReparseOptionalChain(expression) ? factoryCreateCallChain(expression, questionDotToken, typeArguments, argumentList) : factoryCreateCallExpression(expression, typeArguments, argumentList);
                                expression = finishNode(callExpr, pos);
                                continue;
                            }
                            if (questionDotToken) {
                                const name = createMissingNode(79 /* Identifier */, 
                                /*reportAtCurrentPosition*/
                                false, Diagnostics.Identifier_expected);
                                expression = finishNode(factoryCreatePropertyAccessChain(expression, questionDotToken, name), pos);
                            }
                            break;
                        }
                        return expression;
                    }