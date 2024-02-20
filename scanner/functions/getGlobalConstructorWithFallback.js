function getGlobalConstructorWithFallback(name) {
                return factory.createConditionalExpression(factory.createTypeCheck(factory.createIdentifier(name), "function"), 
                /*questionToken*/
                void 0, factory.createIdentifier(name), 
                /*colonToken*/
                void 0, factory.createIdentifier("Object"));
            }