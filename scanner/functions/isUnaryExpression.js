function isUnaryExpression(node) {
            return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
        }