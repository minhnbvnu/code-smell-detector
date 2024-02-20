function hasSideEffect(node, sourceCode, { considerGetters = false, considerImplicitTypeConversion = false } = {}) {
        return visitor.$visit(node, { considerGetters, considerImplicitTypeConversion }, sourceCode.visitorKeys || eslintVisitorKeys.KEYS);
    }