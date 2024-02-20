function isUnaryExpressionKind(kind) {
            switch (kind) {
                case 221 /* PrefixUnaryExpression */:
                case 222 /* PostfixUnaryExpression */:
                case 217 /* DeleteExpression */:
                case 218 /* TypeOfExpression */:
                case 219 /* VoidExpression */:
                case 220 /* AwaitExpression */:
                case 213 /* TypeAssertionExpression */:
                    return true;
                default:
                    return isLeftHandSideExpressionKind(kind);
            }
        }