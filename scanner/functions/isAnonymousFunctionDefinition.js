function isAnonymousFunctionDefinition(node, cb) {
            node = skipOuterExpressions(node);
            switch (node.kind) {
                case 228 /* ClassExpression */:
                case 215 /* FunctionExpression */:
                    if (node.name) {
                        return false;
                    }
                    break;
                case 216 /* ArrowFunction */:
                    break;
                default:
                    return false;
            }
            return typeof cb === "function" ? cb(node) : true;
        }