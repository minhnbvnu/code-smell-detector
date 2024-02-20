function isClassMemberStart() {
                        let idToken;
                        if (token() === 59 /* AtToken */) {
                            return true;
                        }
                        while (isModifierKind(token())) {
                            idToken = token();
                            if (isClassMemberModifier(idToken)) {
                                return true;
                            }
                            nextToken();
                        }
                        if (token() === 41 /* AsteriskToken */) {
                            return true;
                        }
                        if (isLiteralPropertyName()) {
                            idToken = token();
                            nextToken();
                        }
                        if (token() === 22 /* OpenBracketToken */) {
                            return true;
                        }
                        if (idToken !== void 0) {
                            if (!isKeyword(idToken) || idToken === 151 /* SetKeyword */ || idToken === 137 /* GetKeyword */) {
                                return true;
                            }
                            switch (token()) {
                                case 20 /* OpenParenToken */:
                                case 29 /* LessThanToken */:
                                case 53 /* ExclamationToken */:
                                case 58 /* ColonToken */:
                                case 63 /* EqualsToken */:
                                case 57 /* QuestionToken */:
                                    return true;
                                default:
                                    return canParseSemicolon();
                            }
                        }
                        return false;
                    }