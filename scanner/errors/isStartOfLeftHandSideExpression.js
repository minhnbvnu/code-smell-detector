function isStartOfLeftHandSideExpression() {
                        switch (token()) {
                            case 108 /* ThisKeyword */:
                            case 106 /* SuperKeyword */:
                            case 104 /* NullKeyword */:
                            case 110 /* TrueKeyword */:
                            case 95 /* FalseKeyword */:
                            case 8 /* NumericLiteral */:
                            case 9 /* BigIntLiteral */:
                            case 10 /* StringLiteral */:
                            case 14 /* NoSubstitutionTemplateLiteral */:
                            case 15 /* TemplateHead */:
                            case 20 /* OpenParenToken */:
                            case 22 /* OpenBracketToken */:
                            case 18 /* OpenBraceToken */:
                            case 98 /* FunctionKeyword */:
                            case 84 /* ClassKeyword */:
                            case 103 /* NewKeyword */:
                            case 43 /* SlashToken */:
                            case 68 /* SlashEqualsToken */:
                            case 79 /* Identifier */:
                                return true;
                            case 100 /* ImportKeyword */:
                                return lookAhead(nextTokenIsOpenParenOrLessThanOrDot);
                            default:
                                return isIdentifier2();
                        }
                    }