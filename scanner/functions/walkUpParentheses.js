function walkUpParentheses(node) {
            switch (node.kind) {
                case 193 /* ParenthesizedType */:
                    return walkUpParenthesizedTypes(node);
                case 214 /* ParenthesizedExpression */:
                    return walkUpParenthesizedExpressions(node);
                default:
                    return node;
            }
        }