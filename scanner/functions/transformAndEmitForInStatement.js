function transformAndEmitForInStatement(node) {
                if (containsYield(node)) {
                    const obj = declareLocal();
                    const keysArray = declareLocal();
                    const key = declareLocal();
                    const keysIndex = factory2.createLoopVariable();
                    const initializer = node.initializer;
                    hoistVariableDeclaration(keysIndex);
                    emitAssignment(obj, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    emitAssignment(keysArray, factory2.createArrayLiteralExpression());
                    emitStatement(factory2.createForInStatement(key, obj, factory2.createExpressionStatement(factory2.createCallExpression(factory2.createPropertyAccessExpression(keysArray, "push"), 
                    /*typeArguments*/
                    void 0, [key]))));
                    emitAssignment(keysIndex, factory2.createNumericLiteral(0));
                    const conditionLabel = defineLabel();
                    const incrementLabel = defineLabel();
                    const endLoopLabel = beginLoopBlock(incrementLabel);
                    markLabel(conditionLabel);
                    emitBreakWhenFalse(endLoopLabel, factory2.createLessThan(keysIndex, factory2.createPropertyAccessExpression(keysArray, "length")));
                    emitAssignment(key, factory2.createElementAccessExpression(keysArray, keysIndex));
                    emitBreakWhenFalse(incrementLabel, factory2.createBinaryExpression(key, 101 /* InKeyword */, obj));
                    let variable;
                    if (isVariableDeclarationList(initializer)) {
                        for (const variable2 of initializer.declarations) {
                            hoistVariableDeclaration(variable2.name);
                        }
                        variable = factory2.cloneNode(initializer.declarations[0].name);
                    }
                    else {
                        variable = Debug.checkDefined(visitNode(initializer, visitor, isExpression));
                        Debug.assert(isLeftHandSideExpression(variable));
                    }
                    emitAssignment(variable, key);
                    transformAndEmitEmbeddedStatement(node.statement);
                    markLabel(incrementLabel);
                    emitStatement(factory2.createExpressionStatement(factory2.createPostfixIncrement(keysIndex)));
                    emitBreak(conditionLabel);
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }