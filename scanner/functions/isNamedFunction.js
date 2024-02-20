function isNamedFunction(node) {
                if (node.id != null) {
                    return true;
                }
                const parent = node.parent;
                return (parent.type === utils_1.AST_NODE_TYPES.MethodDefinition ||
                    parent.type === utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition ||
                    (parent.type === utils_1.AST_NODE_TYPES.Property &&
                        (parent.kind === 'get' || parent.kind === 'set' || parent.method)));
            }