function parseNonArrayType() {
                        switch (token()) {
                            case 131 /* AnyKeyword */:
                            case 157 /* UnknownKeyword */:
                            case 152 /* StringKeyword */:
                            case 148 /* NumberKeyword */:
                            case 160 /* BigIntKeyword */:
                            case 153 /* SymbolKeyword */:
                            case 134 /* BooleanKeyword */:
                            case 155 /* UndefinedKeyword */:
                            case 144 /* NeverKeyword */:
                            case 149 /* ObjectKeyword */:
                                return tryParse(parseKeywordAndNoDot) || parseTypeReference();
                            case 66 /* AsteriskEqualsToken */:
                                scanner2.reScanAsteriskEqualsToken();
                            case 41 /* AsteriskToken */:
                                return parseJSDocAllType();
                            case 60 /* QuestionQuestionToken */:
                                scanner2.reScanQuestionToken();
                            case 57 /* QuestionToken */:
                                return parseJSDocUnknownOrNullableType();
                            case 98 /* FunctionKeyword */:
                                return parseJSDocFunctionType();
                            case 53 /* ExclamationToken */:
                                return parseJSDocNonNullableType();
                            case 14 /* NoSubstitutionTemplateLiteral */:
                            case 10 /* StringLiteral */:
                            case 8 /* NumericLiteral */:
                            case 9 /* BigIntLiteral */:
                            case 110 /* TrueKeyword */:
                            case 95 /* FalseKeyword */:
                            case 104 /* NullKeyword */:
                                return parseLiteralTypeNode();
                            case 40 /* MinusToken */:
                                return lookAhead(nextTokenIsNumericOrBigIntLiteral) ? parseLiteralTypeNode(
                                /*negative*/
                                true) : parseTypeReference();
                            case 114 /* VoidKeyword */:
                                return parseTokenNode();
                            case 108 /* ThisKeyword */: {
                                const thisKeyword = parseThisTypeNode();
                                if (token() === 140 /* IsKeyword */ && !scanner2.hasPrecedingLineBreak()) {
                                    return parseThisTypePredicate(thisKeyword);
                                }
                                else {
                                    return thisKeyword;
                                }
                            }
                            case 112 /* TypeOfKeyword */:
                                return lookAhead(isStartOfTypeOfImportType) ? parseImportType() : parseTypeQuery();
                            case 18 /* OpenBraceToken */:
                                return lookAhead(isStartOfMappedType) ? parseMappedType() : parseTypeLiteral();
                            case 22 /* OpenBracketToken */:
                                return parseTupleType();
                            case 20 /* OpenParenToken */:
                                return parseParenthesizedType();
                            case 100 /* ImportKeyword */:
                                return parseImportType();
                            case 129 /* AssertsKeyword */:
                                return lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine) ? parseAssertsTypePredicate() : parseTypeReference();
                            case 15 /* TemplateHead */:
                                return parseTemplateType();
                            default:
                                return parseTypeReference();
                        }
                    }