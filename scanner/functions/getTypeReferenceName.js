function getTypeReferenceName(node) {
                if (node) {
                    switch (node.type) {
                        case utils_1.AST_NODE_TYPES.TSTypeAnnotation:
                            return getTypeReferenceName(node.typeAnnotation);
                        case utils_1.AST_NODE_TYPES.TSTypeReference:
                            return getTypeReferenceName(node.typeName);
                        case utils_1.AST_NODE_TYPES.Identifier:
                            return node.name;
                        default:
                            break;
                    }
                }
                return null;
            }