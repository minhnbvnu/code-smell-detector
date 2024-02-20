function isNotEmittedOrPartiallyEmittedNode(node) {
            return isNotEmittedStatement(node) || isPartiallyEmittedExpression(node);
        }