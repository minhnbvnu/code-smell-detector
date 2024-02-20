function getAssignmentDeclarationKindWorker(expr) {
            if (isCallExpression(expr)) {
                if (!isBindableObjectDefinePropertyCall(expr)) {
                    return 0 /* None */;
                }
                const entityName = expr.arguments[0];
                if (isExportsIdentifier(entityName) || isModuleExportsAccessExpression(entityName)) {
                    return 8 /* ObjectDefinePropertyExports */;
                }
                if (isBindableStaticAccessExpression(entityName) && getElementOrPropertyAccessName(entityName) === "prototype") {
                    return 9 /* ObjectDefinePrototypeProperty */;
                }
                return 7 /* ObjectDefinePropertyValue */;
            }
            if (expr.operatorToken.kind !== 63 /* EqualsToken */ || !isAccessExpression(expr.left) || isVoidZero(getRightMostAssignedExpression(expr))) {
                return 0 /* None */;
            }
            if (isBindableStaticNameExpression(expr.left.expression, 
            /*excludeThisKeyword*/
            true) && getElementOrPropertyAccessName(expr.left) === "prototype" && isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
                return 6 /* Prototype */;
            }
            return getAssignmentDeclarationPropertyAccessKind(expr.left);
        }