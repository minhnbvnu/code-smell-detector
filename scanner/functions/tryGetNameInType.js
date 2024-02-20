function tryGetNameInType(name, typeNode) {
                if (typeNode.type === utils_1.AST_NODE_TYPES.TSTypeReference &&
                    typeNode.typeName.type === utils_1.AST_NODE_TYPES.Identifier &&
                    typeNode.typeName.name === name) {
                    return typeNode;
                }
                if (typeNode.type === utils_1.AST_NODE_TYPES.TSUnionType) {
                    for (const type of typeNode.types) {
                        const found = tryGetNameInType(name, type);
                        if (found) {
                            return found;
                        }
                    }
                }
                return undefined;
            }