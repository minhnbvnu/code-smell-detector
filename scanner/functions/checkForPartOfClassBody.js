function checkForPartOfClassBody(firstToken) {
                for (let token = firstToken; token.type === "Punctuator" && !astUtils.isClosingBraceToken(token); token = sourceCode.getTokenAfter(token)) {
                    if (astUtils.isSemicolonToken(token)) {
                        report(token);
                    }
                }
            }