function createRequireCall(moduleSpecifier) {
            return factory.createCallExpression(factory.createIdentifier("require"), 
            /*typeArguments*/
            void 0, [moduleSpecifier]);
        }