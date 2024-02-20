function parseExpressionWithTypeArgumentsForAugments() {
                                const usedBrace = parseOptional(18 /* OpenBraceToken */);
                                const pos = getNodePos();
                                const expression = parsePropertyAccessEntityNameExpression();
                                const typeArguments = tryParseTypeArguments();
                                const node = factory2.createExpressionWithTypeArguments(expression, typeArguments);
                                const res = finishNode(node, pos);
                                if (usedBrace) {
                                    parseExpected(19 /* CloseBraceToken */);
                                }
                                return res;
                            }