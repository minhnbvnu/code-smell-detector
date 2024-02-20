function getLiteralKindOfBinaryPlusOperand(node) {
                node = skipPartiallyEmittedExpressions(node);
                if (isLiteralKind(node.kind)) {
                    return node.kind;
                }
                if (node.kind === 223 /* BinaryExpression */ && node.operatorToken.kind === 39 /* PlusToken */) {
                    if (node.cachedLiteralKind !== void 0) {
                        return node.cachedLiteralKind;
                    }
                    const leftKind = getLiteralKindOfBinaryPlusOperand(node.left);
                    const literalKind = isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand(node.right) ? leftKind : 0 /* Unknown */;
                    node.cachedLiteralKind = literalKind;
                    return literalKind;
                }
                return 0 /* Unknown */;
            }