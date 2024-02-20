function hasUnaryPrefix(init, ...operators) {
                return (init.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
                    operators.includes(init.operator));
            }