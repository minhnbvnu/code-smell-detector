function getFirstToken(element) {
                    let token = sourceCode.getTokenBefore(element);
                    while (astUtils.isOpeningParenToken(token) && token !== startToken) {
                        token = sourceCode.getTokenBefore(token);
                    }
                    return sourceCode.getTokenAfter(token);
                }