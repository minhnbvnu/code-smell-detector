function isSpaceChar(token) {
                return (token.type === utils_1.AST_TOKEN_TYPES.Punctuator && /^[=?:]$/.test(token.value));
            }