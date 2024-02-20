function serializeEntityNameAsExpressionFallback(node) {
                if (node.kind === 79 /* Identifier */) {
                    const copied = serializeEntityNameAsExpression(node);
                    return createCheckedValue(copied, copied);
                }
                if (node.left.kind === 79 /* Identifier */) {
                    return createCheckedValue(serializeEntityNameAsExpression(node.left), serializeEntityNameAsExpression(node));
                }
                const left = serializeEntityNameAsExpressionFallback(node.left);
                const temp = factory.createTempVariable(hoistVariableDeclaration);
                return factory.createLogicalAnd(factory.createLogicalAnd(left.left, factory.createStrictInequality(factory.createAssignment(temp, left.right), factory.createVoidZero())), factory.createPropertyAccessExpression(temp, node.right));
            }