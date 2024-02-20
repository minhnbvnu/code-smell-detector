function isUnambiguouslyStartOfFunctionType() {
                        nextToken();
                        if (token() === 21 /* CloseParenToken */ || token() === 25 /* DotDotDotToken */) {
                            return true;
                        }
                        if (skipParameterStart()) {
                            if (token() === 58 /* ColonToken */ || token() === 27 /* CommaToken */ || token() === 57 /* QuestionToken */ || token() === 63 /* EqualsToken */) {
                                return true;
                            }
                            if (token() === 21 /* CloseParenToken */) {
                                nextToken();
                                if (token() === 38 /* EqualsGreaterThanToken */) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }