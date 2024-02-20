function isConciseBody(node) {
            return isBlock(node) || isExpression(node);
        }