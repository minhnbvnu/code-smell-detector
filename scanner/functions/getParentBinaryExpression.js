function getParentBinaryExpression(expr) {
            const container = findAncestor(expr.parent, (n) => {
                switch (n.kind) {
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        return false;
                    case 225 /* TemplateExpression */:
                    case 223 /* BinaryExpression */:
                        return !(isBinaryExpression(n.parent) && isNotEqualsOperator(n.parent));
                    default:
                        return "quit";
                }
            });
            return container || expr;
        }