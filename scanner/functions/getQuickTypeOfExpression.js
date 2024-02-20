function getQuickTypeOfExpression(node) {
                let expr = skipParentheses(node, 
                /*excludeJSDocTypeAssertions*/
                true);
                if (isJSDocTypeAssertion(expr)) {
                    const type = getJSDocTypeAssertionType(expr);
                    if (!isConstTypeReference(type)) {
                        return getTypeFromTypeNode(type);
                    }
                }
                expr = skipParentheses(node);
                if (isAwaitExpression(expr)) {
                    const type = getQuickTypeOfExpression(expr.expression);
                    return type ? getAwaitedType(type) : void 0;
                }
                if (isCallExpression(expr) && expr.expression.kind !== 106 /* SuperKeyword */ && !isRequireCall(expr, 
                /*checkArgumentIsStringLiteralLike*/
                true) && !isSymbolOrSymbolForCall(expr)) {
                    return isCallChain(expr) ? getReturnTypeOfSingleNonGenericSignatureOfCallChain(expr) : getReturnTypeOfSingleNonGenericCallSignature(checkNonNullExpression(expr.expression));
                }
                else if (isAssertionExpression(expr) && !isConstTypeReference(expr.type)) {
                    return getTypeFromTypeNode(expr.type);
                }
                else if (isLiteralExpression(node) || isBooleanLiteral(node)) {
                    return checkExpression(node);
                }
                return void 0;
            }