function makeChange6(changeTracker, sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            const decorator = findAncestor(token, isDecorator);
            Debug.assert(!!decorator, "Expected position to be owned by a decorator.");
            const replacement = factory.createCallExpression(decorator.expression, 
            /*typeArguments*/
            void 0, 
            /*argumentsArray*/
            void 0);
            changeTracker.replaceNode(sourceFile, decorator.expression, replacement);
        }