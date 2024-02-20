function isUnambiguouslyIndexSignature() {
                        nextToken();
                        if (token() === 25 /* DotDotDotToken */ || token() === 23 /* CloseBracketToken */) {
                            return true;
                        }
                        if (isModifierKind(token())) {
                            nextToken();
                            if (isIdentifier2()) {
                                return true;
                            }
                        }
                        else if (!isIdentifier2()) {
                            return false;
                        }
                        else {
                            nextToken();
                        }
                        if (token() === 58 /* ColonToken */ || token() === 27 /* CommaToken */) {
                            return true;
                        }
                        if (token() !== 57 /* QuestionToken */) {
                            return false;
                        }
                        nextToken();
                        return token() === 58 /* ColonToken */ || token() === 27 /* CommaToken */ || token() === 23 /* CloseBracketToken */;
                    }