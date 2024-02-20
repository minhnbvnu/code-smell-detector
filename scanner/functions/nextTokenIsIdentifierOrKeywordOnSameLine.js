function nextTokenIsIdentifierOrKeywordOnSameLine() {
                        nextToken();
                        return tokenIsIdentifierOrKeyword(token()) && !scanner2.hasPrecedingLineBreak();
                    }