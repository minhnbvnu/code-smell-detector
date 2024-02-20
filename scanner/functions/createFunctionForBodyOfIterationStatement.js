function createFunctionForBodyOfIterationStatement(node, currentState, outerState) {
                const functionName = factory2.createUniqueName("_loop");
                startLexicalEnvironment();
                const statement = visitNode(node.statement, visitor, isStatement, factory2.liftToBlock);
                const lexicalEnvironment = endLexicalEnvironment();
                const statements = [];
                if (shouldConvertConditionOfForStatement(node) || shouldConvertIncrementorOfForStatement(node)) {
                    currentState.conditionVariable = factory2.createUniqueName("inc");
                    if (node.incrementor) {
                        statements.push(factory2.createIfStatement(currentState.conditionVariable, factory2.createExpressionStatement(Debug.checkDefined(visitNode(node.incrementor, visitor, isExpression))), factory2.createExpressionStatement(factory2.createAssignment(currentState.conditionVariable, factory2.createTrue()))));
                    }
                    else {
                        statements.push(factory2.createIfStatement(factory2.createLogicalNot(currentState.conditionVariable), factory2.createExpressionStatement(factory2.createAssignment(currentState.conditionVariable, factory2.createTrue()))));
                    }
                    if (shouldConvertConditionOfForStatement(node)) {
                        statements.push(factory2.createIfStatement(factory2.createPrefixUnaryExpression(53 /* ExclamationToken */, Debug.checkDefined(visitNode(node.condition, visitor, isExpression))), Debug.checkDefined(visitNode(factory2.createBreakStatement(), visitor, isStatement))));
                    }
                }
                Debug.assert(statement);
                if (isBlock(statement)) {
                    addRange(statements, statement.statements);
                }
                else {
                    statements.push(statement);
                }
                copyOutParameters(currentState.loopOutParameters, 1 /* Body */, 1 /* ToOutParameter */, statements);
                insertStatementsAfterStandardPrologue(statements, lexicalEnvironment);
                const loopBody = factory2.createBlock(statements, 
                /*multiLine*/
                true);
                if (isBlock(statement))
                    setOriginalNode(loopBody, statement);
                const containsYield = (node.statement.transformFlags & 1048576 /* ContainsYield */) !== 0;
                let emitFlags = 1048576 /* ReuseTempVariableScope */;
                if (currentState.containsLexicalThis)
                    emitFlags |= 16 /* CapturesThis */;
                if (containsYield && (hierarchyFacts & 4 /* AsyncFunctionBody */) !== 0)
                    emitFlags |= 524288 /* AsyncFunctionBody */;
                const functionDeclaration = factory2.createVariableStatement(
                /*modifiers*/
                void 0, setEmitFlags(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(functionName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, setEmitFlags(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, containsYield ? factory2.createToken(41 /* AsteriskToken */) : void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, currentState.loopParameters, 
                    /*type*/
                    void 0, loopBody), emitFlags))
                ]), 4194304 /* NoHoisting */));
                const part = generateCallToConvertedLoop(functionName, currentState, outerState, containsYield);
                return { functionName, containsYield, functionDeclaration, part };
            }