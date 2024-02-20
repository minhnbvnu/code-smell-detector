function isAncestorHasTypeAnnotation(node) {
                let ancestor = node.parent;
                while (ancestor) {
                    if ((ancestor.type === utils_1.AST_NODE_TYPES.ObjectPattern ||
                        ancestor.type === utils_1.AST_NODE_TYPES.ArrayPattern) &&
                        ancestor.typeAnnotation) {
                        return true;
                    }
                    ancestor = ancestor.parent;
                }
                return false;
            }