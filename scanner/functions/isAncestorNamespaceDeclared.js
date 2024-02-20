function isAncestorNamespaceDeclared(node) {
                let ancestor = node.parent;
                while (ancestor) {
                    if (ancestor.type === utils_1.AST_NODE_TYPES.TSModuleDeclaration &&
                        ancestor.declare) {
                        return true;
                    }
                    ancestor = ancestor.parent;
                }
                return false;
            }