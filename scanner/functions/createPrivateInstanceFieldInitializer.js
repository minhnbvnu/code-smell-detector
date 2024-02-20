function createPrivateInstanceFieldInitializer(receiver, initializer, weakMapName) {
            return factory.createCallExpression(factory.createPropertyAccessExpression(weakMapName, "set"), 
            /*typeArguments*/
            void 0, [receiver, initializer || factory.createVoidZero()]);
        }