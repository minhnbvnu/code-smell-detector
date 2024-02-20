function parseLeftHandSideExpressionOrHigher() {
                        const pos = getNodePos();
                        let expression;
                        if (token() === 100 /* ImportKeyword */) {
                            if (lookAhead(nextTokenIsOpenParenOrLessThan)) {
                                sourceFlags |= 2097152 /* PossiblyContainsDynamicImport */;
                                expression = parseTokenNode();
                            }
                            else if (lookAhead(nextTokenIsDot)) {
                                nextToken();
                                nextToken();
                                expression = finishNode(factory2.createMetaProperty(100 /* ImportKeyword */, parseIdentifierName()), pos);
                                sourceFlags |= 4194304 /* PossiblyContainsImportMeta */;
                            }
                            else {
                                expression = parseMemberExpressionOrHigher();
                            }
                        }
                        else {
                            expression = token() === 106 /* SuperKeyword */ ? parseSuperExpression() : parseMemberExpressionOrHigher();
                        }
                        return parseCallExpressionRest(pos, expression);
                    }