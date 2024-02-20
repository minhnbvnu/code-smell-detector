function isUnusedExpression(node) {
                const parent = node.parent;
                if (parent.type === "ExpressionStatement") {
                    return true;
                }
                if (parent.type === "SequenceExpression") {
                    const isLastExpression = parent.expressions[parent.expressions.length - 1] === node;
                    if (!isLastExpression) {
                        return true;
                    }
                    return isUnusedExpression(parent);
                }
                return false;
            }