function transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts) {
                const expression = visitNode(node.expression, visitor, isExpression);
                const iterator = isIdentifier(expression) ? factory2.getGeneratedNameForNode(expression) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const result = isIdentifier(expression) ? factory2.getGeneratedNameForNode(iterator) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const nonUserCode = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const done = factory2.createTempVariable(hoistVariableDeclaration);
                const errorRecord = factory2.createUniqueName("e");
                const catchVariable = factory2.getGeneratedNameForNode(errorRecord);
                const returnMethod = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const callValues = setTextRange(emitHelpers().createAsyncValuesHelper(expression), node.expression);
                const callNext = factory2.createCallExpression(factory2.createPropertyAccessExpression(iterator, "next"), 
                /*typeArguments*/
                void 0, []);
                const getDone = factory2.createPropertyAccessExpression(result, "done");
                const getValue = factory2.createPropertyAccessExpression(result, "value");
                const callReturn = factory2.createFunctionCallCall(returnMethod, iterator, []);
                hoistVariableDeclaration(errorRecord);
                hoistVariableDeclaration(returnMethod);
                const initializer = ancestorFacts & 2 /* IterationContainer */ ? factory2.inlineExpressions([factory2.createAssignment(errorRecord, factory2.createVoidZero()), callValues]) : callValues;
                const forStatement = setEmitFlags(setTextRange(factory2.createForStatement(
                /*initializer*/
                setEmitFlags(setTextRange(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(nonUserCode, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createTrue()),
                    setTextRange(factory2.createVariableDeclaration(iterator, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer), node.expression),
                    factory2.createVariableDeclaration(result)
                ]), node.expression), 4194304 /* NoHoisting */), 
                /*condition*/
                factory2.inlineExpressions([
                    factory2.createAssignment(result, createDownlevelAwait(callNext)),
                    factory2.createAssignment(done, getDone),
                    factory2.createLogicalNot(done)
                ]), 
                /*incrementor*/
                void 0, 
                /*statement*/
                convertForOfStatementHead(node, getValue, nonUserCode)), 
                /*location*/
                node), 512 /* NoTokenTrailingSourceMaps */);
                setOriginalNode(forStatement, node);
                return factory2.createTryStatement(factory2.createBlock([
                    factory2.restoreEnclosingLabel(forStatement, outermostLabeledStatement)
                ]), factory2.createCatchClause(factory2.createVariableDeclaration(catchVariable), setEmitFlags(factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createAssignment(errorRecord, factory2.createObjectLiteralExpression([
                        factory2.createPropertyAssignment("error", catchVariable)
                    ])))
                ]), 1 /* SingleLine */)), factory2.createBlock([
                    factory2.createTryStatement(
                    /*tryBlock*/
                    factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(factory2.createLogicalAnd(factory2.createLogicalAnd(factory2.createLogicalNot(nonUserCode), factory2.createLogicalNot(done)), factory2.createAssignment(returnMethod, factory2.createPropertyAccessExpression(iterator, "return"))), factory2.createExpressionStatement(createDownlevelAwait(callReturn))), 1 /* SingleLine */)
                    ]), 
                    /*catchClause*/
                    void 0, 
                    /*finallyBlock*/
                    setEmitFlags(factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(errorRecord, factory2.createThrowStatement(factory2.createPropertyAccessExpression(errorRecord, "error"))), 1 /* SingleLine */)
                    ]), 1 /* SingleLine */))
                ]));
            }