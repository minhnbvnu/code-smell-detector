function isJSDocTypeExpressionOrChild(node) {
            return !!findAncestor(node, isJSDocTypeExpression);
        }