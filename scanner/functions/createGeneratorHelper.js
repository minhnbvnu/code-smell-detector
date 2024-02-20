function createGeneratorHelper(body) {
                context.requestEmitHelper(generatorHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__generator"), 
                /*typeArguments*/
                void 0, [factory2.createThis(), body]);
            }