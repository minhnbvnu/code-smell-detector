function isKeyTypeNode(node) {
                return ((node.type === utils_1.AST_NODE_TYPES.TSPropertySignature ||
                    node.type === utils_1.AST_NODE_TYPES.TSIndexSignature ||
                    node.type === utils_1.AST_NODE_TYPES.PropertyDefinition) &&
                    !!node.typeAnnotation);
            }