function getLocEnd() {
            if (node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression) {
                // find the end location for arrow function expression
                return sourceCode.getTokenBefore(node.body, token => token.type === utils_1.AST_TOKEN_TYPES.Punctuator && token.value === '=>').loc.end;
            }
            // return the end location for a regular function
            return sourceCode.getTokenBefore(node.body).loc.end;
        }