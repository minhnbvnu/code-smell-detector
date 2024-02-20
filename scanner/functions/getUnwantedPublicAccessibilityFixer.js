function getUnwantedPublicAccessibilityFixer(node) {
                return function (fixer) {
                    const tokens = sourceCode.getTokens(node);
                    let rangeToRemove;
                    for (let i = 0; i < tokens.length; i++) {
                        const token = tokens[i];
                        if (token.type === utils_1.AST_TOKEN_TYPES.Keyword &&
                            token.value === 'public') {
                            const commensAfterPublicKeyword = sourceCode.getCommentsAfter(token);
                            if (commensAfterPublicKeyword.length) {
                                // public /* Hi there! */ static foo()
                                // ^^^^^^^
                                rangeToRemove = [
                                    token.range[0],
                                    commensAfterPublicKeyword[0].range[0],
                                ];
                                break;
                            }
                            else {
                                // public static foo()
                                // ^^^^^^^
                                rangeToRemove = [token.range[0], tokens[i + 1].range[0]];
                                break;
                            }
                        }
                    }
                    return fixer.removeRange(rangeToRemove);
                };
            }