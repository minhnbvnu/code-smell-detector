function getContextualTypeForThisPropertyAssignment(binaryExpression) {
                if (!binaryExpression.symbol)
                    return getTypeOfExpression(binaryExpression.left);
                if (binaryExpression.symbol.valueDeclaration) {
                    const annotated = getEffectiveTypeAnnotationNode(binaryExpression.symbol.valueDeclaration);
                    if (annotated) {
                        const type = getTypeFromTypeNode(annotated);
                        if (type) {
                            return type;
                        }
                    }
                }
                const thisAccess = cast(binaryExpression.left, isAccessExpression);
                if (!isObjectLiteralMethod(getThisContainer(thisAccess.expression, 
                /*includeArrowFunctions*/
                false, 
                /*includeClassComputedPropertyName*/
                false))) {
                    return void 0;
                }
                const thisType = checkThisExpression(thisAccess.expression);
                const nameStr = getElementOrPropertyAccessName(thisAccess);
                return nameStr !== void 0 && getTypeOfPropertyOfContextualType(thisType, nameStr) || void 0;
            }