function isTypeMemberStart() {
                        if (token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */ || token() === 137 /* GetKeyword */ || token() === 151 /* SetKeyword */) {
                            return true;
                        }
                        let idToken = false;
                        while (isModifierKind(token())) {
                            idToken = true;
                            nextToken();
                        }
                        if (token() === 22 /* OpenBracketToken */) {
                            return true;
                        }
                        if (isLiteralPropertyName()) {
                            idToken = true;
                            nextToken();
                        }
                        if (idToken) {
                            return token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */ || token() === 57 /* QuestionToken */ || token() === 58 /* ColonToken */ || token() === 27 /* CommaToken */ || canParseSemicolon();
                        }
                        return false;
                    }