function isDeclaration(node) {
                if (node.type === utils_1.AST_NODE_TYPES.TSModuleDeclaration &&
                    node.declare === true) {
                    return true;
                }
                return node.parent != null && isDeclaration(node.parent);
            }