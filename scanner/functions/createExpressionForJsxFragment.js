function createExpressionForJsxFragment(factory2, jsxFactoryEntity, jsxFragmentFactoryEntity, reactNamespace, children, parentElement, location) {
            const tagName = createJsxFragmentFactoryExpression(factory2, jsxFragmentFactoryEntity, reactNamespace, parentElement);
            const argumentsList = [tagName, factory2.createNull()];
            if (children && children.length > 0) {
                if (children.length > 1) {
                    for (const child of children) {
                        startOnNewLine(child);
                        argumentsList.push(child);
                    }
                }
                else {
                    argumentsList.push(children[0]);
                }
            }
            return setTextRange(factory2.createCallExpression(createJsxFactoryExpression(factory2, jsxFactoryEntity, reactNamespace, parentElement), 
            /*typeArguments*/
            void 0, argumentsList), location);
        }