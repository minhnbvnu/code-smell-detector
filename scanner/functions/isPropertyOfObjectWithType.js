function isPropertyOfObjectWithType(property) {
        if (!property || property.type !== utils_1.AST_NODE_TYPES.Property) {
            return false;
        }
        const objectExpr = property.parent; // this shouldn't happen, checking just in case
        /* istanbul ignore if */ if (!objectExpr ||
            objectExpr.type !== utils_1.AST_NODE_TYPES.ObjectExpression) {
            return false;
        }
        const parent = objectExpr.parent; // this shouldn't happen, checking just in case
        /* istanbul ignore if */ if (!parent) {
            return false;
        }
        return ((0, astUtils_1.isTypeAssertion)(parent) ||
            isPropertyDefinitionWithTypeAnnotation(parent) ||
            isVariableDeclaratorWithTypeAnnotation(parent) ||
            isFunctionArgument(parent) ||
            isPropertyOfObjectWithType(parent));
    }