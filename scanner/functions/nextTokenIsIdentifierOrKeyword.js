function nextTokenIsIdentifierOrKeyword() {
                        nextToken();
                        return tokenIsIdentifierOrKeyword(token());
                    }