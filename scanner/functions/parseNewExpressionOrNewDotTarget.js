function parseNewExpressionOrNewDotTarget() {
                        const pos = getNodePos();
                        parseExpected(103 /* NewKeyword */);
                        if (parseOptional(24 /* DotToken */)) {
                            const name = parseIdentifierName();
                            return finishNode(factory2.createMetaProperty(103 /* NewKeyword */, name), pos);
                        }
                        const expressionPos = getNodePos();
                        let expression = parseMemberExpressionRest(expressionPos, parsePrimaryExpression(), 
                        /*allowOptionalChain*/
                        false);
                        let typeArguments;
                        if (expression.kind === 230 /* ExpressionWithTypeArguments */) {
                            typeArguments = expression.typeArguments;
                            expression = expression.expression;
                        }
                        if (token() === 28 /* QuestionDotToken */) {
                            parseErrorAtCurrentToken(Diagnostics.Invalid_optional_chain_from_new_expression_Did_you_mean_to_call_0, getTextOfNodeFromSourceText(sourceText, expression));
                        }
                        const argumentList = token() === 20 /* OpenParenToken */ ? parseArgumentList() : void 0;
                        return finishNode(factoryCreateNewExpression(expression, typeArguments, argumentList), pos);
                    }