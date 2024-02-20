function createImportCallExpressionAMD(arg, containsLexicalThis) {
                const resolve = factory2.createUniqueName("resolve");
                const reject = factory2.createUniqueName("reject");
                const parameters = [
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, 
                    /*name*/
                    resolve),
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, 
                    /*name*/
                    reject)
                ];
                const body = factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createCallExpression(factory2.createIdentifier("require"), 
                    /*typeArguments*/
                    void 0, [factory2.createArrayLiteralExpression([arg || factory2.createOmittedExpression()]), resolve, reject]))
                ]);
                let func;
                if (languageVersion >= 2 /* ES2015 */) {
                    func = factory2.createArrowFunction(
                    /*modifiers*/
                    void 0, 
                    /*typeParameters*/
                    void 0, parameters, 
                    /*type*/
                    void 0, 
                    /*equalsGreaterThanToken*/
                    void 0, body);
                }
                else {
                    func = factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, parameters, 
                    /*type*/
                    void 0, body);
                    if (containsLexicalThis) {
                        setEmitFlags(func, 16 /* CapturesThis */);
                    }
                }
                const promise = factory2.createNewExpression(factory2.createIdentifier("Promise"), 
                /*typeArguments*/
                void 0, [func]);
                if (getESModuleInterop(compilerOptions)) {
                    return factory2.createCallExpression(factory2.createPropertyAccessExpression(promise, factory2.createIdentifier("then")), 
                    /*typeArguments*/
                    void 0, [emitHelpers().createImportStarCallbackHelper()]);
                }
                return promise;
            }