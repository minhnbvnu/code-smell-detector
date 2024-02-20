function shouldParseReturnType(returnToken, isType) {
                        if (returnToken === 38 /* EqualsGreaterThanToken */) {
                            parseExpected(returnToken);
                            return true;
                        }
                        else if (parseOptional(58 /* ColonToken */)) {
                            return true;
                        }
                        else if (isType && token() === 38 /* EqualsGreaterThanToken */) {
                            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(58 /* ColonToken */));
                            nextToken();
                            return true;
                        }
                        return false;
                    }