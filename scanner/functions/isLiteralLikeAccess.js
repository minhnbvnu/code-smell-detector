function isLiteralLikeAccess(node) {
            return isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node);
        }