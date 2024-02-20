function isSimpleType(node) {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.Identifier:
            case utils_1.AST_NODE_TYPES.TSAnyKeyword:
            case utils_1.AST_NODE_TYPES.TSBooleanKeyword:
            case utils_1.AST_NODE_TYPES.TSNeverKeyword:
            case utils_1.AST_NODE_TYPES.TSNumberKeyword:
            case utils_1.AST_NODE_TYPES.TSBigIntKeyword:
            case utils_1.AST_NODE_TYPES.TSObjectKeyword:
            case utils_1.AST_NODE_TYPES.TSStringKeyword:
            case utils_1.AST_NODE_TYPES.TSSymbolKeyword:
            case utils_1.AST_NODE_TYPES.TSUnknownKeyword:
            case utils_1.AST_NODE_TYPES.TSVoidKeyword:
            case utils_1.AST_NODE_TYPES.TSNullKeyword:
            case utils_1.AST_NODE_TYPES.TSArrayType:
            case utils_1.AST_NODE_TYPES.TSUndefinedKeyword:
            case utils_1.AST_NODE_TYPES.TSThisType:
            case utils_1.AST_NODE_TYPES.TSQualifiedName:
                return true;
            case utils_1.AST_NODE_TYPES.TSTypeReference:
                if (node.typeName &&
                    node.typeName.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.typeName.name === 'Array') {
                    if (!node.typeParameters) {
                        return true;
                    }
                    if (node.typeParameters.params.length === 1) {
                        return isSimpleType(node.typeParameters.params[0]);
                    }
                }
                else {
                    if (node.typeParameters) {
                        return false;
                    }
                    return isSimpleType(node.typeName);
                }
                return false;
            default:
                return false;
        }
    }