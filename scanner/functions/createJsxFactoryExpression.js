function createJsxFactoryExpression(factory2, jsxFactoryEntity, reactNamespace, parent2) {
            return jsxFactoryEntity ? createJsxFactoryExpressionFromEntityName(factory2, jsxFactoryEntity, parent2) : factory2.createPropertyAccessExpression(createReactNamespace(reactNamespace, parent2), "createElement");
        }