function build2() {
                blockIndex = 0;
                labelNumber = 0;
                labelNumbers = void 0;
                lastOperationWasAbrupt = false;
                lastOperationWasCompletion = false;
                clauses = void 0;
                statements = void 0;
                exceptionBlockStack = void 0;
                currentExceptionBlock = void 0;
                withBlockStack = void 0;
                const buildResult = buildStatements();
                return emitHelpers().createGeneratorHelper(setEmitFlags(factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, state)], 
                /*type*/
                void 0, factory2.createBlock(buildResult, 
                /*multiLine*/
                buildResult.length > 0)), 1048576 /* ReuseTempVariableScope */));
            }