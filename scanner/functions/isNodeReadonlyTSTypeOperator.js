function isNodeReadonlyTSTypeOperator(node) {
                return (node.type === utils_1.AST_NODE_TYPES.TSTypeOperator &&
                    node.operator === 'readonly');
            }