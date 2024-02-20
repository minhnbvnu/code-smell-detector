function createAwaiterHelper(hasLexicalThis, hasLexicalArguments, promiseConstructor, body) {
                context.requestEmitHelper(awaiterHelper);
                const generatorFunc = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, factory2.createToken(41 /* AsteriskToken */), 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                [], 
                /*type*/
                void 0, body);
                (generatorFunc.emitNode || (generatorFunc.emitNode = {})).flags |= 524288 /* AsyncFunctionBody */ | 1048576 /* ReuseTempVariableScope */;
                return factory2.createCallExpression(getUnscopedHelperName("__awaiter"), 
                /*typeArguments*/
                void 0, [
                    hasLexicalThis ? factory2.createThis() : factory2.createVoidZero(),
                    hasLexicalArguments ? factory2.createIdentifier("arguments") : factory2.createVoidZero(),
                    promiseConstructor ? createExpressionFromEntityName(factory2, promiseConstructor) : factory2.createVoidZero(),
                    generatorFunc
                ]);
            }