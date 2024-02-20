function isLiteralExpressionOfObject(node) {
            switch (node.kind) {
                case 207 /* ObjectLiteralExpression */:
                case 206 /* ArrayLiteralExpression */:
                case 13 /* RegularExpressionLiteral */:
                case 215 /* FunctionExpression */:
                case 228 /* ClassExpression */:
                    return true;
            }
            return false;
        }