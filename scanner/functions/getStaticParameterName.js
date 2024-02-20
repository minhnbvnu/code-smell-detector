function getStaticParameterName(param) {
        switch (param.type) {
            case utils_1.AST_NODE_TYPES.Identifier:
                return param.name;
            case utils_1.AST_NODE_TYPES.RestElement:
                return getStaticParameterName(param.argument);
            default:
                return undefined;
        }
    }