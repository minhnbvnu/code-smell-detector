function visitDestructuringAssignmentTarget(node) {
                if (isObjectLiteralExpression(node) || isArrayLiteralExpression(node)) {
                    return visitAssignmentPattern(node);
                }
                if (isSuperProperty(node) && classThis && classSuper) {
                    const propertyName = isElementAccessExpression(node) ? visitNode(node.argumentExpression, visitor, isExpression) : isIdentifier(node.name) ? factory2.createStringLiteralFromNode(node.name) : void 0;
                    if (propertyName) {
                        const paramName = factory2.createTempVariable(
                        /*recordTempVariable*/
                        void 0);
                        const expression = factory2.createAssignmentTargetWrapper(paramName, factory2.createReflectSetCall(classSuper, propertyName, paramName, classThis));
                        setOriginalNode(expression, node);
                        setTextRange(expression, node);
                        return expression;
                    }
                }
                return visitEachChild(node, visitor, context);
            }