function isLessThanLengthExpression(node, name) {
                if ((node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.BinaryExpression &&
                    node.operator === '<' &&
                    isMatchingIdentifier(node.left, name) &&
                    node.right.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    isMatchingIdentifier(node.right.property, 'length')) {
                    return node.right.object;
                }
                return null;
            }