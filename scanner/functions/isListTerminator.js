function isListTerminator(kind) {
                        if (token() === 1 /* EndOfFileToken */) {
                            return true;
                        }
                        switch (kind) {
                            case 1 /* BlockStatements */:
                            case 2 /* SwitchClauses */:
                            case 4 /* TypeMembers */:
                            case 5 /* ClassMembers */:
                            case 6 /* EnumMembers */:
                            case 12 /* ObjectLiteralMembers */:
                            case 9 /* ObjectBindingElements */:
                            case 23 /* ImportOrExportSpecifiers */:
                            case 24 /* AssertEntries */:
                                return token() === 19 /* CloseBraceToken */;
                            case 3 /* SwitchClauseStatements */:
                                return token() === 19 /* CloseBraceToken */ || token() === 82 /* CaseKeyword */ || token() === 88 /* DefaultKeyword */;
                            case 7 /* HeritageClauseElement */:
                                return token() === 18 /* OpenBraceToken */ || token() === 94 /* ExtendsKeyword */ || token() === 117 /* ImplementsKeyword */;
                            case 8 /* VariableDeclarations */:
                                return isVariableDeclaratorListTerminator();
                            case 19 /* TypeParameters */:
                                return token() === 31 /* GreaterThanToken */ || token() === 20 /* OpenParenToken */ || token() === 18 /* OpenBraceToken */ || token() === 94 /* ExtendsKeyword */ || token() === 117 /* ImplementsKeyword */;
                            case 11 /* ArgumentExpressions */:
                                return token() === 21 /* CloseParenToken */ || token() === 26 /* SemicolonToken */;
                            case 15 /* ArrayLiteralMembers */:
                            case 21 /* TupleElementTypes */:
                            case 10 /* ArrayBindingElements */:
                                return token() === 23 /* CloseBracketToken */;
                            case 17 /* JSDocParameters */:
                            case 16 /* Parameters */:
                            case 18 /* RestProperties */:
                                return token() === 21 /* CloseParenToken */ || token() === 23 /* CloseBracketToken */;
                            case 20 /* TypeArguments */:
                                return token() !== 27 /* CommaToken */;
                            case 22 /* HeritageClauses */:
                                return token() === 18 /* OpenBraceToken */ || token() === 19 /* CloseBraceToken */;
                            case 13 /* JsxAttributes */:
                                return token() === 31 /* GreaterThanToken */ || token() === 43 /* SlashToken */;
                            case 14 /* JsxChildren */:
                                return token() === 29 /* LessThanToken */ && lookAhead(nextTokenIsSlash);
                            default:
                                return false;
                        }
                    }