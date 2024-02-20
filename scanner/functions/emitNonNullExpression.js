function emitNonNullExpression(node) {
                emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
                writeOperator("!");
            }