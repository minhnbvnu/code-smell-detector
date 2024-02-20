function parseImportOrExportSpecifier(kind) {
                        const pos = getNodePos();
                        let checkIdentifierIsKeyword = isKeyword(token()) && !isIdentifier2();
                        let checkIdentifierStart = scanner2.getTokenPos();
                        let checkIdentifierEnd = scanner2.getTextPos();
                        let isTypeOnly = false;
                        let propertyName;
                        let canParseAsKeyword = true;
                        let name = parseIdentifierName();
                        if (name.escapedText === "type") {
                            if (token() === 128 /* AsKeyword */) {
                                const firstAs = parseIdentifierName();
                                if (token() === 128 /* AsKeyword */) {
                                    const secondAs = parseIdentifierName();
                                    if (tokenIsIdentifierOrKeyword(token())) {
                                        isTypeOnly = true;
                                        propertyName = firstAs;
                                        name = parseNameWithKeywordCheck();
                                        canParseAsKeyword = false;
                                    }
                                    else {
                                        propertyName = name;
                                        name = secondAs;
                                        canParseAsKeyword = false;
                                    }
                                }
                                else if (tokenIsIdentifierOrKeyword(token())) {
                                    propertyName = name;
                                    canParseAsKeyword = false;
                                    name = parseNameWithKeywordCheck();
                                }
                                else {
                                    isTypeOnly = true;
                                    name = firstAs;
                                }
                            }
                            else if (tokenIsIdentifierOrKeyword(token())) {
                                isTypeOnly = true;
                                name = parseNameWithKeywordCheck();
                            }
                        }
                        if (canParseAsKeyword && token() === 128 /* AsKeyword */) {
                            propertyName = name;
                            parseExpected(128 /* AsKeyword */);
                            name = parseNameWithKeywordCheck();
                        }
                        if (kind === 273 /* ImportSpecifier */ && checkIdentifierIsKeyword) {
                            parseErrorAt(checkIdentifierStart, checkIdentifierEnd, Diagnostics.Identifier_expected);
                        }
                        const node = kind === 273 /* ImportSpecifier */ ? factory2.createImportSpecifier(isTypeOnly, propertyName, name) : factory2.createExportSpecifier(isTypeOnly, propertyName, name);
                        return finishNode(node, pos);
                        function parseNameWithKeywordCheck() {
                            checkIdentifierIsKeyword = isKeyword(token()) && !isIdentifier2();
                            checkIdentifierStart = scanner2.getTokenPos();
                            checkIdentifierEnd = scanner2.getTextPos();
                            return parseIdentifierName();
                        }
                    }