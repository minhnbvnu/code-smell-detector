function visitNonOptionalPropertyOrElementAccessExpression(node, captureThisArg, isDelete) {
                if (isOptionalChain(node)) {
                    return visitOptionalExpression(node, captureThisArg, isDelete);
                }
                let expression = visitNode(node.expression, visitor, isExpression);
                Debug.assertNotNode(expression, isSyntheticReference);
                let thisArg;
                if (captureThisArg) {
                    if (!isSimpleCopiableExpression(expression)) {
                        thisArg = factory2.createTempVariable(hoistVariableDeclaration);
                        expression = factory2.createAssignment(thisArg, expression);
                    }
                    else {
                        thisArg = expression;
                    }
                }
                expression = node.kind === 208 /* PropertyAccessExpression */ ? factory2.updatePropertyAccessExpression(node, expression, visitNode(node.name, visitor, isIdentifier)) : factory2.updateElementAccessExpression(node, expression, visitNode(node.argumentExpression, visitor, isExpression));
                return thisArg ? factory2.createSyntheticReferenceExpression(expression, thisArg) : expression;
            }