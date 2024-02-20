function isNodeValidArrayTSTypeReference(node) {
                return (node.type === utils_1.AST_NODE_TYPES.TSTypeReference &&
                    node.typeName !== undefined &&
                    node.typeName.type === utils_1.AST_NODE_TYPES.Identifier &&
                    ['Array', 'ReadonlyArray'].includes(node.typeName.name));
            }