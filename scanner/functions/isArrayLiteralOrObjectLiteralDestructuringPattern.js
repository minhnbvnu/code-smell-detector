function isArrayLiteralOrObjectLiteralDestructuringPattern(node) {
            if (node.kind === 206 /* ArrayLiteralExpression */ || node.kind === 207 /* ObjectLiteralExpression */) {
                if (node.parent.kind === 223 /* BinaryExpression */ && node.parent.left === node && node.parent.operatorToken.kind === 63 /* EqualsToken */) {
                    return true;
                }
                if (node.parent.kind === 247 /* ForOfStatement */ && node.parent.initializer === node) {
                    return true;
                }
                if (isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent.kind === 299 /* PropertyAssignment */ ? node.parent.parent : node.parent)) {
                    return true;
                }
            }
            return false;
        }