function isFunctionCall(init, callName) {
                if (init.type === utils_1.AST_NODE_TYPES.ChainExpression) {
                    return isFunctionCall(init.expression, callName);
                }
                return (init.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    init.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                    init.callee.name === callName);
            }