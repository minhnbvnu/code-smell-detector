function describeLiteralTypeNode(typeNode) {
        switch (typeNode.type) {
            case utils_1.AST_NODE_TYPES.TSAnyKeyword:
                return 'any';
            case utils_1.AST_NODE_TYPES.TSBooleanKeyword:
                return 'boolean';
            case utils_1.AST_NODE_TYPES.TSNeverKeyword:
                return 'never';
            case utils_1.AST_NODE_TYPES.TSNumberKeyword:
                return 'number';
            case utils_1.AST_NODE_TYPES.TSStringKeyword:
                return 'string';
            case utils_1.AST_NODE_TYPES.TSUnknownKeyword:
                return 'unknown';
            case utils_1.AST_NODE_TYPES.TSLiteralType:
                switch (typeNode.literal.type) {
                    case utils_1.TSESTree.AST_NODE_TYPES.Literal:
                        switch (typeof typeNode.literal.value) {
                            case 'bigint':
                                return `${typeNode.literal.value < 0 ? '-' : ''}${typeNode.literal.value}n`;
                            case 'string':
                                return JSON.stringify(typeNode.literal.value);
                            default:
                                return `${typeNode.literal.value}`;
                        }
                    case utils_1.TSESTree.AST_NODE_TYPES.TemplateLiteral:
                        return 'template literal type';
                }
        }
        return 'literal type';
    }