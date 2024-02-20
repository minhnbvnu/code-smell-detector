function convertForOfStatementHead(node, boundValue, convertedLoopBodyStatements) {
                const statements = [];
                const initializer = node.initializer;
                if (isVariableDeclarationList(initializer)) {
                    if (node.initializer.flags & 3 /* BlockScoped */) {
                        enableSubstitutionsForBlockScopedBindings();
                    }
                    const firstOriginalDeclaration = firstOrUndefined(initializer.declarations);
                    if (firstOriginalDeclaration && isBindingPattern(firstOriginalDeclaration.name)) {
                        const declarations = flattenDestructuringBinding(firstOriginalDeclaration, visitor, context, 0 /* All */, boundValue);
                        const declarationList = setTextRange(factory2.createVariableDeclarationList(declarations), node.initializer);
                        setOriginalNode(declarationList, node.initializer);
                        setSourceMapRange(declarationList, createRange(declarations[0].pos, last(declarations).end));
                        statements.push(factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, declarationList));
                    }
                    else {
                        statements.push(setTextRange(factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, setOriginalNode(setTextRange(factory2.createVariableDeclarationList([
                            factory2.createVariableDeclaration(firstOriginalDeclaration ? firstOriginalDeclaration.name : factory2.createTempVariable(
                            /*recordTempVariable*/
                            void 0), 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, boundValue)
                        ]), moveRangePos(initializer, -1)), initializer)), moveRangeEnd(initializer, -1)));
                    }
                }
                else {
                    const assignment = factory2.createAssignment(initializer, boundValue);
                    if (isDestructuringAssignment(assignment)) {
                        statements.push(factory2.createExpressionStatement(visitBinaryExpression(assignment, 
                        /*expressionResultIsUnused*/
                        true)));
                    }
                    else {
                        setTextRangeEnd(assignment, initializer.end);
                        statements.push(setTextRange(factory2.createExpressionStatement(Debug.checkDefined(visitNode(assignment, visitor, isExpression))), moveRangeEnd(initializer, -1)));
                    }
                }
                if (convertedLoopBodyStatements) {
                    return createSyntheticBlockForConvertedStatements(addRange(statements, convertedLoopBodyStatements));
                }
                else {
                    const statement = visitNode(node.statement, visitor, isStatement, factory2.liftToBlock);
                    Debug.assert(statement);
                    if (isBlock(statement)) {
                        return factory2.updateBlock(statement, setTextRange(factory2.createNodeArray(concatenate(statements, statement.statements)), statement.statements));
                    }
                    else {
                        statements.push(statement);
                        return createSyntheticBlockForConvertedStatements(statements);
                    }
                }
            }