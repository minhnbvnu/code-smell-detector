function createAsyncGeneratorHelper(generatorFunc, hasLexicalThis) {
                context.requestEmitHelper(awaitHelper);
                context.requestEmitHelper(asyncGeneratorHelper);
                (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= 524288 /* AsyncFunctionBody */ | 1048576 /* ReuseTempVariableScope */;
                return factory2.createCallExpression(getUnscopedHelperName("__asyncGenerator"), 
                /*typeArguments*/
                void 0, [
                    hasLexicalThis ? factory2.createThis() : factory2.createVoidZero(),
                    factory2.createIdentifier("arguments"),
                    generatorFunc
                ]);
            }