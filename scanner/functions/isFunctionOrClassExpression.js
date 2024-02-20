function isFunctionOrClassExpression(node) {
            switch (node.kind) {
                case 216 /* ArrowFunction */:
                case 215 /* FunctionExpression */:
                case 228 /* ClassExpression */:
                    return true;
                default:
                    return false;
            }
        }