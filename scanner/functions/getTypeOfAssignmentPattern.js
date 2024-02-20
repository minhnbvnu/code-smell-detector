function getTypeOfAssignmentPattern(expr) {
                Debug.assert(expr.kind === 207 /* ObjectLiteralExpression */ || expr.kind === 206 /* ArrayLiteralExpression */);
                if (expr.parent.kind === 247 /* ForOfStatement */) {
                    const iteratedType = checkRightHandSideOfForOf(expr.parent);
                    return checkDestructuringAssignment(expr, iteratedType || errorType);
                }
                if (expr.parent.kind === 223 /* BinaryExpression */) {
                    const iteratedType = getTypeOfExpression(expr.parent.right);
                    return checkDestructuringAssignment(expr, iteratedType || errorType);
                }
                if (expr.parent.kind === 299 /* PropertyAssignment */) {
                    const node2 = cast(expr.parent.parent, isObjectLiteralExpression);
                    const typeOfParentObjectLiteral = getTypeOfAssignmentPattern(node2) || errorType;
                    const propertyIndex = indexOfNode(node2.properties, expr.parent);
                    return checkObjectLiteralDestructuringPropertyAssignment(node2, typeOfParentObjectLiteral, propertyIndex);
                }
                const node = cast(expr.parent, isArrayLiteralExpression);
                const typeOfArrayLiteral = getTypeOfAssignmentPattern(node) || errorType;
                const elementType = checkIteratedTypeOrElementType(65 /* Destructuring */, typeOfArrayLiteral, undefinedType, expr.parent) || errorType;
                return checkArrayLiteralDestructuringElementAssignment(node, typeOfArrayLiteral, node.elements.indexOf(expr), elementType);
            }