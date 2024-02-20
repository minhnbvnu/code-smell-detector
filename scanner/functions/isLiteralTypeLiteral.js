function isLiteralTypeLiteral(node) {
            switch (node.kind) {
                case 104 /* NullKeyword */:
                case 110 /* TrueKeyword */:
                case 95 /* FalseKeyword */:
                case 221 /* PrefixUnaryExpression */:
                    return true;
                default:
                    return isLiteralExpression(node);
            }
        }