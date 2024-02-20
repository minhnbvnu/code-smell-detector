function parseMemberExpressionRest(pos, expression, allowOptionalChain) {
                        while (true) {
                            let questionDotToken;
                            let isPropertyAccess = false;
                            if (allowOptionalChain && isStartOfOptionalPropertyOrElementAccessChain()) {
                                questionDotToken = parseExpectedToken(28 /* QuestionDotToken */);
                                isPropertyAccess = tokenIsIdentifierOrKeyword(token());
                            }
                            else {
                                isPropertyAccess = parseOptional(24 /* DotToken */);
                            }
                            if (isPropertyAccess) {
                                expression = parsePropertyAccessExpressionRest(pos, expression, questionDotToken);
                                continue;
                            }
                            if ((questionDotToken || !inDecoratorContext()) && parseOptional(22 /* OpenBracketToken */)) {
                                expression = parseElementAccessExpressionRest(pos, expression, questionDotToken);
                                continue;
                            }
                            if (isTemplateStartOfTaggedTemplate()) {
                                expression = !questionDotToken && expression.kind === 230 /* ExpressionWithTypeArguments */ ? parseTaggedTemplateRest(pos, expression.expression, questionDotToken, expression.typeArguments) : parseTaggedTemplateRest(pos, expression, questionDotToken, 
                                /*typeArguments*/
                                void 0);
                                continue;
                            }
                            if (!questionDotToken) {
                                if (token() === 53 /* ExclamationToken */ && !scanner2.hasPrecedingLineBreak()) {
                                    nextToken();
                                    expression = finishNode(factory2.createNonNullExpression(expression), pos);
                                    continue;
                                }
                                const typeArguments = tryParse(parseTypeArgumentsInExpression);
                                if (typeArguments) {
                                    expression = finishNode(factory2.createExpressionWithTypeArguments(expression, typeArguments), pos);
                                    continue;
                                }
                            }
                            return expression;
                        }
                    }