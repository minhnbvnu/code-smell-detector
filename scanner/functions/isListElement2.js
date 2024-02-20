function isListElement2(parsingContext2, inErrorRecovery) {
                        const node = currentNode(parsingContext2);
                        if (node) {
                            return true;
                        }
                        switch (parsingContext2) {
                            case 0 /* SourceElements */:
                            case 1 /* BlockStatements */:
                            case 3 /* SwitchClauseStatements */:
                                return !(token() === 26 /* SemicolonToken */ && inErrorRecovery) && isStartOfStatement();
                            case 2 /* SwitchClauses */:
                                return token() === 82 /* CaseKeyword */ || token() === 88 /* DefaultKeyword */;
                            case 4 /* TypeMembers */:
                                return lookAhead(isTypeMemberStart);
                            case 5 /* ClassMembers */:
                                return lookAhead(isClassMemberStart) || token() === 26 /* SemicolonToken */ && !inErrorRecovery;
                            case 6 /* EnumMembers */:
                                return token() === 22 /* OpenBracketToken */ || isLiteralPropertyName();
                            case 12 /* ObjectLiteralMembers */:
                                switch (token()) {
                                    case 22 /* OpenBracketToken */:
                                    case 41 /* AsteriskToken */:
                                    case 25 /* DotDotDotToken */:
                                    case 24 /* DotToken */:
                                        return true;
                                    default:
                                        return isLiteralPropertyName();
                                }
                            case 18 /* RestProperties */:
                                return isLiteralPropertyName();
                            case 9 /* ObjectBindingElements */:
                                return token() === 22 /* OpenBracketToken */ || token() === 25 /* DotDotDotToken */ || isLiteralPropertyName();
                            case 24 /* AssertEntries */:
                                return isAssertionKey2();
                            case 7 /* HeritageClauseElement */:
                                if (token() === 18 /* OpenBraceToken */) {
                                    return lookAhead(isValidHeritageClauseObjectLiteral);
                                }
                                if (!inErrorRecovery) {
                                    return isStartOfLeftHandSideExpression() && !isHeritageClauseExtendsOrImplementsKeyword();
                                }
                                else {
                                    return isIdentifier2() && !isHeritageClauseExtendsOrImplementsKeyword();
                                }
                            case 8 /* VariableDeclarations */:
                                return isBindingIdentifierOrPrivateIdentifierOrPattern();
                            case 10 /* ArrayBindingElements */:
                                return token() === 27 /* CommaToken */ || token() === 25 /* DotDotDotToken */ || isBindingIdentifierOrPrivateIdentifierOrPattern();
                            case 19 /* TypeParameters */:
                                return token() === 101 /* InKeyword */ || token() === 85 /* ConstKeyword */ || isIdentifier2();
                            case 15 /* ArrayLiteralMembers */:
                                switch (token()) {
                                    case 27 /* CommaToken */:
                                    case 24 /* DotToken */:
                                        return true;
                                }
                            case 11 /* ArgumentExpressions */:
                                return token() === 25 /* DotDotDotToken */ || isStartOfExpression();
                            case 16 /* Parameters */:
                                return isStartOfParameter(
                                /*isJSDocParameter*/
                                false);
                            case 17 /* JSDocParameters */:
                                return isStartOfParameter(
                                /*isJSDocParameter*/
                                true);
                            case 20 /* TypeArguments */:
                            case 21 /* TupleElementTypes */:
                                return token() === 27 /* CommaToken */ || isStartOfType();
                            case 22 /* HeritageClauses */:
                                return isHeritageClause2();
                            case 23 /* ImportOrExportSpecifiers */:
                                return tokenIsIdentifierOrKeyword(token());
                            case 13 /* JsxAttributes */:
                                return tokenIsIdentifierOrKeyword(token()) || token() === 18 /* OpenBraceToken */;
                            case 14 /* JsxChildren */:
                                return true;
                        }
                        return Debug.fail("Non-exhaustive case in 'isListElement'.");
                    }