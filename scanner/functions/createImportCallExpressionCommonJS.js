function createImportCallExpressionCommonJS(arg, isInlineable) {
                const needSyncEval = arg && !isSimpleInlineableExpression(arg) && !isInlineable;
                const promiseResolveCall = factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Promise"), "resolve"), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                needSyncEval ? languageVersion >= 2 /* ES2015 */ ? [
                    factory2.createTemplateExpression(factory2.createTemplateHead(""), [
                        factory2.createTemplateSpan(arg, factory2.createTemplateTail(""))
                    ])
                ] : [
                    factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createStringLiteral(""), "concat"), 
                    /*typeArguments*/
                    void 0, [arg])
                ] : []);
                let requireCall = factory2.createCallExpression(factory2.createIdentifier("require"), 
                /*typeArguments*/
                void 0, needSyncEval ? [factory2.createIdentifier("s")] : arg ? [arg] : []);
                if (getESModuleInterop(compilerOptions)) {
                    requireCall = emitHelpers().createImportStarHelper(requireCall);
                }
                const parameters = needSyncEval ? [
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, 
                    /*name*/
                    "s")
                ] : [];
                let func;
                if (languageVersion >= 2 /* ES2015 */) {
                    func = factory2.createArrowFunction(
                    /*modifiers*/
                    void 0, 
                    /*typeParameters*/
                    void 0, 
                    /*parameters*/
                    parameters, 
                    /*type*/
                    void 0, 
                    /*equalsGreaterThanToken*/
                    void 0, requireCall);
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
                    void 0, 
                    /*parameters*/
                    parameters, 
                    /*type*/
                    void 0, factory2.createBlock([factory2.createReturnStatement(requireCall)]));
                }
                const downleveledImport = factory2.createCallExpression(factory2.createPropertyAccessExpression(promiseResolveCall, "then"), 
                /*typeArguments*/
                void 0, [func]);
                return downleveledImport;
            }