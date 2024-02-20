function isLiteralLikeElementAccess(node) {
            return isElementAccessExpression(node) && isStringOrNumericLiteralLike(node.argumentExpression);
        }