function appendLabel(markLabelEnd) {
                if (!clauses) {
                    clauses = [];
                }
                if (statements) {
                    if (withBlockStack) {
                        for (let i = withBlockStack.length - 1; i >= 0; i--) {
                            const withBlock = withBlockStack[i];
                            statements = [factory2.createWithStatement(withBlock.expression, factory2.createBlock(statements))];
                        }
                    }
                    if (currentExceptionBlock) {
                        const { startLabel, catchLabel, finallyLabel, endLabel } = currentExceptionBlock;
                        statements.unshift(factory2.createExpressionStatement(factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createPropertyAccessExpression(state, "trys"), "push"), 
                        /*typeArguments*/
                        void 0, [
                            factory2.createArrayLiteralExpression([
                                createLabel(startLabel),
                                createLabel(catchLabel),
                                createLabel(finallyLabel),
                                createLabel(endLabel)
                            ])
                        ])));
                        currentExceptionBlock = void 0;
                    }
                    if (markLabelEnd) {
                        statements.push(factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(state, "label"), factory2.createNumericLiteral(labelNumber + 1))));
                    }
                }
                clauses.push(factory2.createCaseClause(factory2.createNumericLiteral(labelNumber), statements || []));
                statements = void 0;
            }