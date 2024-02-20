function isEqualityComparison(node) {
                return (node.type === utils_1.AST_NODE_TYPES.BinaryExpression &&
                    EQ_OPERATORS.test(node.operator));
            }