function transformLogicalAssignment(binaryExpression) {
                const operator = binaryExpression.operatorToken;
                const nonAssignmentOperator = getNonAssignmentOperatorForCompoundAssignment(operator.kind);
                let left = skipParentheses(visitNode(binaryExpression.left, visitor, isLeftHandSideExpression));
                let assignmentTarget = left;
                const right = skipParentheses(visitNode(binaryExpression.right, visitor, isExpression));
                if (isAccessExpression(left)) {
                    const propertyAccessTargetSimpleCopiable = isSimpleCopiableExpression(left.expression);
                    const propertyAccessTarget = propertyAccessTargetSimpleCopiable ? left.expression : factory2.createTempVariable(hoistVariableDeclaration);
                    const propertyAccessTargetAssignment = propertyAccessTargetSimpleCopiable ? left.expression : factory2.createAssignment(propertyAccessTarget, left.expression);
                    if (isPropertyAccessExpression(left)) {
                        assignmentTarget = factory2.createPropertyAccessExpression(propertyAccessTarget, left.name);
                        left = factory2.createPropertyAccessExpression(propertyAccessTargetAssignment, left.name);
                    }
                    else {
                        const elementAccessArgumentSimpleCopiable = isSimpleCopiableExpression(left.argumentExpression);
                        const elementAccessArgument = elementAccessArgumentSimpleCopiable ? left.argumentExpression : factory2.createTempVariable(hoistVariableDeclaration);
                        assignmentTarget = factory2.createElementAccessExpression(propertyAccessTarget, elementAccessArgument);
                        left = factory2.createElementAccessExpression(propertyAccessTargetAssignment, elementAccessArgumentSimpleCopiable ? left.argumentExpression : factory2.createAssignment(elementAccessArgument, left.argumentExpression));
                    }
                }
                return factory2.createBinaryExpression(left, nonAssignmentOperator, factory2.createParenthesizedExpression(factory2.createAssignment(assignmentTarget, right)));
            }