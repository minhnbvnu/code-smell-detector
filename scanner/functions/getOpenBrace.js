function getOpenBrace(node) {
                // guaranteed for enums
                // This is the only change made here from the base rule
                return sourceCode.getFirstToken(node, {
                    filter: token => token.type === utils_1.AST_TOKEN_TYPES.Punctuator && token.value === '{',
                });
            }