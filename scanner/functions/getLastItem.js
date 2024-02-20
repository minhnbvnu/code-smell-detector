function getLastItem(node) {
                switch (node.type) {
                    case utils_1.AST_NODE_TYPES.TSEnumDeclaration:
                        return last(node.members);
                    case utils_1.AST_NODE_TYPES.TSTypeParameterDeclaration:
                        return last(node.params);
                    case utils_1.AST_NODE_TYPES.TSTupleType:
                        return last(node.elementTypes);
                    default:
                        return null;
                }
            }