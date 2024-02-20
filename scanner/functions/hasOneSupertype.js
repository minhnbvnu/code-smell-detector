function hasOneSupertype(node) {
                if (!node.extends || node.extends.length === 0) {
                    return false;
                }
                if (node.extends.length !== 1) {
                    return true;
                }
                const expr = node.extends[0].expression;
                return (expr.type !== utils_1.AST_NODE_TYPES.Identifier || expr.name !== 'Function');
            }