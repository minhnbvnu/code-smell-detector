function isLeftHandSideExpression(node) {
            return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
        }