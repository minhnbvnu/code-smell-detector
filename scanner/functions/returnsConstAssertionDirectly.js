function returnsConstAssertionDirectly(node) {
        const { body } = node;
        if ((0, astUtils_1.isTypeAssertion)(body)) {
            const { typeAnnotation } = body;
            if (typeAnnotation.type === utils_1.AST_NODE_TYPES.TSTypeReference) {
                const { typeName } = typeAnnotation;
                if (typeName.type === utils_1.AST_NODE_TYPES.Identifier &&
                    typeName.name === 'const') {
                    return true;
                }
            }
        }
        return false;
    }