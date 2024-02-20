function nextTokenIsIdentifierOrKeywordOrGreaterThan() {
                        nextToken();
                        return tokenIsIdentifierOrKeywordOrGreaterThan(token());
                    }