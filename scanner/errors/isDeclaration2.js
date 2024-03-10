function isDeclaration2() {
                        while (true) {
                            switch (token()) {
                                case 113 /* VarKeyword */:
                                case 119 /* LetKeyword */:
                                case 85 /* ConstKeyword */:
                                case 98 /* FunctionKeyword */:
                                case 84 /* ClassKeyword */:
                                case 92 /* EnumKeyword */:
                                    return true;
                                case 118 /* InterfaceKeyword */:
                                case 154 /* TypeKeyword */:
                                    return nextTokenIsIdentifierOnSameLine();
                                case 142 /* ModuleKeyword */:
                                case 143 /* NamespaceKeyword */:
                                    return nextTokenIsIdentifierOrStringLiteralOnSameLine();
                                case 126 /* AbstractKeyword */:
                                case 127 /* AccessorKeyword */:
                                case 132 /* AsyncKeyword */:
                                case 136 /* DeclareKeyword */:
                                case 121 /* PrivateKeyword */:
                                case 122 /* ProtectedKeyword */:
                                case 123 /* PublicKeyword */:
                                case 146 /* ReadonlyKeyword */:
                                    nextToken();
                                    if (scanner2.hasPrecedingLineBreak()) {
                                        return false;
                                    }
                                    continue;
                                case 159 /* GlobalKeyword */:
                                    nextToken();
                                    return token() === 18 /* OpenBraceToken */ || token() === 79 /* Identifier */ || token() === 93 /* ExportKeyword */;
                                case 100 /* ImportKeyword */:
                                    nextToken();
                                    return token() === 10 /* StringLiteral */ || token() === 41 /* AsteriskToken */ || token() === 18 /* OpenBraceToken */ || tokenIsIdentifierOrKeyword(token());
                                case 93 /* ExportKeyword */:
                                    let currentToken2 = nextToken();
                                    if (currentToken2 === 154 /* TypeKeyword */) {
                                        currentToken2 = lookAhead(nextToken);
                                    }
                                    if (currentToken2 === 63 /* EqualsToken */ || currentToken2 === 41 /* AsteriskToken */ || currentToken2 === 18 /* OpenBraceToken */ || currentToken2 === 88 /* DefaultKeyword */ || currentToken2 === 128 /* AsKeyword */ || currentToken2 === 59 /* AtToken */) {
                                        return true;
                                    }
                                    continue;
                                case 124 /* StaticKeyword */:
                                    nextToken();
                                    continue;
                                default:
                                    return false;
                            }
                        }
                    }