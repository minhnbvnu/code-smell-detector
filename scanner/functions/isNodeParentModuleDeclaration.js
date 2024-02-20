function isNodeParentModuleDeclaration(node) {
                if (!node.parent) {
                    return false;
                }
                if (node.parent.type === utils_1.AST_NODE_TYPES.TSModuleDeclaration) {
                    return true;
                }
                if (node.parent.type === utils_1.AST_NODE_TYPES.Program) {
                    return false;
                }
                return isNodeParentModuleDeclaration(node.parent);
            }