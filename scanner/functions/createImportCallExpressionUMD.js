function createImportCallExpressionUMD(arg, containsLexicalThis) {
                needUMDDynamicImportHelper = true;
                if (isSimpleCopiableExpression(arg)) {
                    const argClone = isGeneratedIdentifier(arg) ? arg : isStringLiteral(arg) ? factory2.createStringLiteralFromNode(arg) : setEmitFlags(setTextRange(factory2.cloneNode(arg), arg), 3072 /* NoComments */);
                    return factory2.createConditionalExpression(
                    /*condition*/
                    factory2.createIdentifier("__syncRequire"), 
                    /*questionToken*/
                    void 0, 
                    /*whenTrue*/
                    createImportCallExpressionCommonJS(arg), 
                    /*colonToken*/
                    void 0, 
                    /*whenFalse*/
                    createImportCallExpressionAMD(argClone, containsLexicalThis));
                }
                else {
                    const temp = factory2.createTempVariable(hoistVariableDeclaration);
                    return factory2.createComma(factory2.createAssignment(temp, arg), factory2.createConditionalExpression(
                    /*condition*/
                    factory2.createIdentifier("__syncRequire"), 
                    /*questionToken*/
                    void 0, 
                    /*whenTrue*/
                    createImportCallExpressionCommonJS(temp, 
                    /* isInlineable */
                    true), 
                    /*colonToken*/
                    void 0, 
                    /*whenFalse*/
                    createImportCallExpressionAMD(temp, containsLexicalThis)));
                }
            }