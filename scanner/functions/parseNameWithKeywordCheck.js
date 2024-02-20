function parseNameWithKeywordCheck() {
                            checkIdentifierIsKeyword = isKeyword(token()) && !isIdentifier2();
                            checkIdentifierStart = scanner2.getTokenPos();
                            checkIdentifierEnd = scanner2.getTextPos();
                            return parseIdentifierName();
                        }