function convertForOfStatementForIterable(node, outermostLabeledStatement, convertedLoopBodyStatements, ancestorFacts) {
                const expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                const iterator = isIdentifier(expression) ? factory2.getGeneratedNameForNode(expression) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const result = isIdentifier(expression) ? factory2.getGeneratedNameForNode(iterator) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const errorRecord = factory2.createUniqueName("e");
                const catchVariable = factory2.getGeneratedNameForNode(errorRecord);
                const returnMethod = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const values = setTextRange(emitHelpers().createValuesHelper(expression), node.expression);
                const next = factory2.createCallExpression(factory2.createPropertyAccessExpression(iterator, "next"), 
                /*typeArguments*/
                void 0, []);
                hoistVariableDeclaration(errorRecord);
                hoistVariableDeclaration(returnMethod);
                const initializer = ancestorFacts & 1024 /* IterationContainer */ ? factory2.inlineExpressions([factory2.createAssignment(errorRecord, factory2.createVoidZero()), values]) : values;
                const forStatement = setEmitFlags(setTextRange(factory2.createForStatement(
                /*initializer*/
                setEmitFlags(setTextRange(factory2.createVariableDeclarationList([
                    setTextRange(factory2.createVariableDeclaration(iterator, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer), node.expression),
                    factory2.createVariableDeclaration(result, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, next)
                ]), node.expression), 4194304 /* NoHoisting */), 
                /*condition*/
                factory2.createLogicalNot(factory2.createPropertyAccessExpression(result, "done")), 
                /*incrementor*/
                factory2.createAssignment(result, next), 
                /*statement*/
                convertForOfStatementHead(node, factory2.createPropertyAccessExpression(result, "value"), convertedLoopBodyStatements)), 
                /*location*/
                node), 512 /* NoTokenTrailingSourceMaps */);
                return factory2.createTryStatement(factory2.createBlock([
                    factory2.restoreEnclosingLabel(forStatement, outermostLabeledStatement, convertedLoopState && resetLabel)
                ]), factory2.createCatchClause(factory2.createVariableDeclaration(catchVariable), setEmitFlags(factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createAssignment(errorRecord, factory2.createObjectLiteralExpression([
                        factory2.createPropertyAssignment("error", catchVariable)
                    ])))
                ]), 1 /* SingleLine */)), factory2.createBlock([
                    factory2.createTryStatement(
                    /*tryBlock*/
                    factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(factory2.createLogicalAnd(factory2.createLogicalAnd(result, factory2.createLogicalNot(factory2.createPropertyAccessExpression(result, "done"))), factory2.createAssignment(returnMethod, factory2.createPropertyAccessExpression(iterator, "return"))), factory2.createExpressionStatement(factory2.createFunctionCallCall(returnMethod, iterator, []))), 1 /* SingleLine */)
                    ]), 
                    /*catchClause*/
                    void 0, 
                    /*finallyBlock*/
                    setEmitFlags(factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(errorRecord, factory2.createThrowStatement(factory2.createPropertyAccessExpression(errorRecord, "error"))), 1 /* SingleLine */)
                    ]), 1 /* SingleLine */))
                ]));
            }