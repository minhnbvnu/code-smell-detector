function getReturnType(expr) {
            if (expr.type) {
                return expr.type;
            }
            if (isVariableDeclaration(expr.parent) && expr.parent.type && isFunctionTypeNode(expr.parent.type)) {
                return expr.parent.type.type;
            }
        }