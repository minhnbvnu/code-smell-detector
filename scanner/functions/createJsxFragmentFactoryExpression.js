function createJsxFragmentFactoryExpression(factory2, jsxFragmentFactoryEntity, reactNamespace, parent2) {
            return jsxFragmentFactoryEntity ? createJsxFactoryExpressionFromEntityName(factory2, jsxFragmentFactoryEntity, parent2) : factory2.createPropertyAccessExpression(createReactNamespace(reactNamespace, parent2), "Fragment");
        }