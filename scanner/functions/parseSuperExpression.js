function parseSuperExpression() {
                        const pos = getNodePos();
                        let expression = parseTokenNode();
                        if (token() === 29 /* LessThanToken */) {
                            const startPos = getNodePos();
                            const typeArguments = tryParse(parseTypeArgumentsInExpression);
                            if (typeArguments !== void 0) {
                                parseErrorAt(startPos, getNodePos(), Diagnostics.super_may_not_use_type_arguments);
                                if (!isTemplateStartOfTaggedTemplate()) {
                                    expression = factory2.createExpressionWithTypeArguments(expression, typeArguments);
                                }
                            }
                        }
                        if (token() === 20 /* OpenParenToken */ || token() === 24 /* DotToken */ || token() === 22 /* OpenBracketToken */) {
                            return expression;
                        }
                        parseExpectedToken(24 /* DotToken */, Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
                        return finishNode(factoryCreatePropertyAccessExpression(expression, parseRightSideOfDot(
                        /*allowIdentifierNames*/
                        true, 
                        /*allowPrivateIdentifiers*/
                        true)), pos);
                    }