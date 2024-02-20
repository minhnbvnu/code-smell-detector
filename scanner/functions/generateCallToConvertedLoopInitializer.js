function generateCallToConvertedLoopInitializer(initFunctionExpressionName, containsYield) {
                const call = factory2.createCallExpression(initFunctionExpressionName, 
                /*typeArguments*/
                void 0, []);
                const callResult = containsYield ? factory2.createYieldExpression(factory2.createToken(41 /* AsteriskToken */), setEmitFlags(call, 16777216 /* Iterator */)) : call;
                return factory2.createExpressionStatement(callResult);
            }