function createPrivateInstanceMethodInitializer(receiver, weakSetName) {
            return factory.createCallExpression(factory.createPropertyAccessExpression(weakSetName, "add"), 
            /*typeArguments*/
            void 0, [receiver]);
        }