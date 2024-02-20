function createRunInitializersHelper(thisArg, initializers, value) {
                context.requestEmitHelper(runInitializersHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__runInitializers"), 
                /*typeArguments*/
                void 0, value ? [thisArg, initializers, value] : [thisArg, initializers]);
            }