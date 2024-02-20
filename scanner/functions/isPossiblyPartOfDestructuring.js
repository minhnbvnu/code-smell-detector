function isPossiblyPartOfDestructuring(node) {
            switch (node.kind) {
                case 79 /* Identifier */:
                case 206 /* ArrayLiteralExpression */:
                case 207 /* ObjectLiteralExpression */:
                case 299 /* PropertyAssignment */:
                case 300 /* ShorthandPropertyAssignment */:
                    return true;
                default:
                    return false;
            }
        }