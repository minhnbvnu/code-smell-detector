function wrapMemberDefinitionListener(coreListener) {
                return (node) => {
                    if (node.computed) {
                        return;
                    }
                    if (node.value &&
                        node.value.type === utils_1.AST_NODE_TYPES.TSEmptyBodyFunctionExpression) {
                        return;
                    }
                    return coreListener(node);
                };
            }