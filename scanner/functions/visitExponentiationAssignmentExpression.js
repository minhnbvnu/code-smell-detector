function visitExponentiationAssignmentExpression(node) {
                let target;
                let value;
                const left = visitNode(node.left, visitor, isExpression);
                const right = visitNode(node.right, visitor, isExpression);
                if (isElementAccessExpression(left)) {
                    const expressionTemp = factory2.createTempVariable(hoistVariableDeclaration);
                    const argumentExpressionTemp = factory2.createTempVariable(hoistVariableDeclaration);
                    target = setTextRange(factory2.createElementAccessExpression(setTextRange(factory2.createAssignment(expressionTemp, left.expression), left.expression), setTextRange(factory2.createAssignment(argumentExpressionTemp, left.argumentExpression), left.argumentExpression)), left);
                    value = setTextRange(factory2.createElementAccessExpression(expressionTemp, argumentExpressionTemp), left);
                }
                else if (isPropertyAccessExpression(left)) {
                    const expressionTemp = factory2.createTempVariable(hoistVariableDeclaration);
                    target = setTextRange(factory2.createPropertyAccessExpression(setTextRange(factory2.createAssignment(expressionTemp, left.expression), left.expression), left.name), left);
                    value = setTextRange(factory2.createPropertyAccessExpression(expressionTemp, left.name), left);
                }
                else {
                    target = left;
                    value = left;
                }
                return setTextRange(factory2.createAssignment(target, setTextRange(factory2.createGlobalMethodCall("Math", "pow", [value, right]), node)), node);
            }