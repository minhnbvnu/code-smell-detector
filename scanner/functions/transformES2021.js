function transformES2021(context) {
            const { hoistVariableDeclaration, factory: factory2 } = context;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                if ((node.transformFlags & 16 /* ContainsES2021 */) === 0) {
                    return node;
                }
                if (isLogicalOrCoalescingAssignmentExpression(node)) {
                    return transformLogicalAssignment(node);
                }
                return visitEachChild(node, visitor, context);
            }
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
        }