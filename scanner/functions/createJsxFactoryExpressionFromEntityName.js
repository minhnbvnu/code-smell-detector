function createJsxFactoryExpressionFromEntityName(factory2, jsxFactory, parent2) {
            if (isQualifiedName(jsxFactory)) {
                const left = createJsxFactoryExpressionFromEntityName(factory2, jsxFactory.left, parent2);
                const right = factory2.createIdentifier(idText(jsxFactory.right));
                right.escapedText = jsxFactory.right.escapedText;
                return factory2.createPropertyAccessExpression(left, right);
            }
            else {
                return createReactNamespace(idText(jsxFactory), parent2);
            }
        }