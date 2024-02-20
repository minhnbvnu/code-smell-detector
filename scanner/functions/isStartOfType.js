function isStartOfType(inStartOfParameter) {
                        switch (token()) {
                            case 131 /* AnyKeyword */:
                            case 157 /* UnknownKeyword */:
                            case 152 /* StringKeyword */:
                            case 148 /* NumberKeyword */:
                            case 160 /* BigIntKeyword */:
                            case 134 /* BooleanKeyword */:
                            case 146 /* ReadonlyKeyword */:
                            case 153 /* SymbolKeyword */:
                            case 156 /* UniqueKeyword */:
                            case 114 /* VoidKeyword */:
                            case 155 /* UndefinedKeyword */:
                            case 104 /* NullKeyword */:
                            case 108 /* ThisKeyword */:
                            case 112 /* TypeOfKeyword */:
                            case 144 /* NeverKeyword */:
                            case 18 /* OpenBraceToken */:
                            case 22 /* OpenBracketToken */:
                            case 29 /* LessThanToken */:
                            case 51 /* BarToken */:
                            case 50 /* AmpersandToken */:
                            case 103 /* NewKeyword */:
                            case 10 /* StringLiteral */:
                            case 8 /* NumericLiteral */:
                            case 9 /* BigIntLiteral */:
                            case 110 /* TrueKeyword */:
                            case 95 /* FalseKeyword */:
                            case 149 /* ObjectKeyword */:
                            case 41 /* AsteriskToken */:
                            case 57 /* QuestionToken */:
                            case 53 /* ExclamationToken */:
                            case 25 /* DotDotDotToken */:
                            case 138 /* InferKeyword */:
                            case 100 /* ImportKeyword */:
                            case 129 /* AssertsKeyword */:
                            case 14 /* NoSubstitutionTemplateLiteral */:
                            case 15 /* TemplateHead */:
                                return true;
                            case 98 /* FunctionKeyword */:
                                return !inStartOfParameter;
                            case 40 /* MinusToken */:
                                return !inStartOfParameter && lookAhead(nextTokenIsNumericOrBigIntLiteral);
                            case 20 /* OpenParenToken */:
                                return !inStartOfParameter && lookAhead(isStartOfParenthesizedOrFunctionType);
                            default:
                                return isIdentifier2();
                        }
                    }