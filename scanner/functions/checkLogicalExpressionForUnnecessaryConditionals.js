function checkLogicalExpressionForUnnecessaryConditionals(node) {
                if (node.operator === '??') {
                    checkNodeForNullish(node.left);
                    return;
                }
                // Only checks the left side, since the right side might not be "conditional" at all.
                // The right side will be checked if the LogicalExpression is used in a conditional context
                checkNode(node.left);
            }