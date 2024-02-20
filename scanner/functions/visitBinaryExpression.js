function visitBinaryExpression(node) {
                const assoc = getExpressionAssociativity(node);
                switch (assoc) {
                    case 0 /* Left */:
                        return visitLeftAssociativeBinaryExpression(node);
                    case 1 /* Right */:
                        return visitRightAssociativeBinaryExpression(node);
                    default:
                        return Debug.assertNever(assoc);
                }
            }