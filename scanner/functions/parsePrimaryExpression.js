function parsePrimaryExpression() {
                        switch (token()) {
                            case 8 /* NumericLiteral */:
                            case 9 /* BigIntLiteral */:
                            case 10 /* StringLiteral */:
                            case 14 /* NoSubstitutionTemplateLiteral */:
                                return parseLiteralNode();
                            case 108 /* ThisKeyword */:
                            case 106 /* SuperKeyword */:
                            case 104 /* NullKeyword */:
                            case 110 /* TrueKeyword */:
                            case 95 /* FalseKeyword */:
                                return parseTokenNode();
                            case 20 /* OpenParenToken */:
                                return parseParenthesizedExpression();
                            case 22 /* OpenBracketToken */:
                                return parseArrayLiteralExpression();
                            case 18 /* OpenBraceToken */:
                                return parseObjectLiteralExpression();
                            case 132 /* AsyncKeyword */:
                                if (!lookAhead(nextTokenIsFunctionKeywordOnSameLine)) {
                                    break;
                                }
                                return parseFunctionExpression();
                            case 59 /* AtToken */:
                                return parseDecoratedExpression();
                            case 84 /* ClassKeyword */:
                                return parseClassExpression();
                            case 98 /* FunctionKeyword */:
                                return parseFunctionExpression();
                            case 103 /* NewKeyword */:
                                return parseNewExpressionOrNewDotTarget();
                            case 43 /* SlashToken */:
                            case 68 /* SlashEqualsToken */:
                                if (reScanSlashToken() === 13 /* RegularExpressionLiteral */) {
                                    return parseLiteralNode();
                                }
                                break;
                            case 15 /* TemplateHead */:
                                return parseTemplateExpression(
                                /* isTaggedTemplate */
                                false);
                            case 80 /* PrivateIdentifier */:
                                return parsePrivateIdentifier();
                        }
                        return parseIdentifier(Diagnostics.Expression_expected);
                    }