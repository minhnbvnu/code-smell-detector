function accessKind(node) {
            const { parent: parent2 } = node;
            if (!parent2)
                return 0 /* Read */;
            switch (parent2.kind) {
                case 214 /* ParenthesizedExpression */:
                    return accessKind(parent2);
                case 222 /* PostfixUnaryExpression */:
                case 221 /* PrefixUnaryExpression */:
                    const { operator } = parent2;
                    return operator === 45 /* PlusPlusToken */ || operator === 46 /* MinusMinusToken */ ? writeOrReadWrite() : 0 /* Read */;
                case 223 /* BinaryExpression */:
                    const { left, operatorToken } = parent2;
                    return left === node && isAssignmentOperator(operatorToken.kind) ? operatorToken.kind === 63 /* EqualsToken */ ? 1 /* Write */ : writeOrReadWrite() : 0 /* Read */;
                case 208 /* PropertyAccessExpression */:
                    return parent2.name !== node ? 0 /* Read */ : accessKind(parent2);
                case 299 /* PropertyAssignment */: {
                    const parentAccess = accessKind(parent2.parent);
                    return node === parent2.name ? reverseAccessKind(parentAccess) : parentAccess;
                }
                case 300 /* ShorthandPropertyAssignment */:
                    return node === parent2.objectAssignmentInitializer ? 0 /* Read */ : accessKind(parent2.parent);
                case 206 /* ArrayLiteralExpression */:
                    return accessKind(parent2);
                default:
                    return 0 /* Read */;
            }
            function writeOrReadWrite() {
                return parent2.parent && walkUpParenthesizedExpressions(parent2.parent).kind === 241 /* ExpressionStatement */ ? 1 /* Write */ : 2 /* ReadWrite */;
            }
        }