function getContextualTypeFromParent(node, checker, contextFlags) {
            const parent2 = walkUpParenthesizedExpressions(node.parent);
            switch (parent2.kind) {
                case 211 /* NewExpression */:
                    return checker.getContextualType(parent2, contextFlags);
                case 223 /* BinaryExpression */: {
                    const { left, operatorToken, right } = parent2;
                    return isEqualityOperatorKind(operatorToken.kind) ? checker.getTypeAtLocation(node === right ? left : right) : checker.getContextualType(node, contextFlags);
                }
                case 292 /* CaseClause */:
                    return getSwitchedType(parent2, checker);
                default:
                    return checker.getContextualType(node, contextFlags);
            }
        }