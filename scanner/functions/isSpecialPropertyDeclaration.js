function isSpecialPropertyDeclaration(expr) {
            return isInJSFile(expr) && expr.parent && expr.parent.kind === 241 /* ExpressionStatement */ && (!isElementAccessExpression(expr) || isLiteralLikeElementAccess(expr)) && !!getJSDocTypeTag(expr.parent);
        }