function isCurrentlyTraversedNodeWithinModuleDeclaration() {
                return context
                    .getAncestors()
                    .some(node => node.type === utils_1.AST_NODE_TYPES.TSModuleDeclaration &&
                    node.declare &&
                    node.global);
            }