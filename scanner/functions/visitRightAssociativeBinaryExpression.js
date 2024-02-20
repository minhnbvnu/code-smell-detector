function visitRightAssociativeBinaryExpression(node) {
                const { left, right } = node;
                if (containsYield(right)) {
                    let target;
                    switch (left.kind) {
                        case 208 /* PropertyAccessExpression */:
                            target = factory2.updatePropertyAccessExpression(left, cacheExpression(Debug.checkDefined(visitNode(left.expression, visitor, isLeftHandSideExpression))), left.name);
                            break;
                        case 209 /* ElementAccessExpression */:
                            target = factory2.updateElementAccessExpression(left, cacheExpression(Debug.checkDefined(visitNode(left.expression, visitor, isLeftHandSideExpression))), cacheExpression(Debug.checkDefined(visitNode(left.argumentExpression, visitor, isExpression))));
                            break;
                        default:
                            target = Debug.checkDefined(visitNode(left, visitor, isExpression));
                            break;
                    }
                    const operator = node.operatorToken.kind;
                    if (isCompoundAssignment(operator)) {
                        return setTextRange(factory2.createAssignment(target, setTextRange(factory2.createBinaryExpression(cacheExpression(target), getNonAssignmentOperatorForCompoundAssignment(operator), Debug.checkDefined(visitNode(right, visitor, isExpression))), node)), node);
                    }
                    else {
                        return factory2.updateBinaryExpression(node, target, node.operatorToken, Debug.checkDefined(visitNode(right, visitor, isExpression)));
                    }
                }
                return visitEachChild(node, visitor, context);
            }