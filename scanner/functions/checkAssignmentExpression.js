function checkAssignmentExpression(node) {
                // Similar to checkLogicalExpressionForUnnecessaryConditionals, since
                // a ||= b is equivalent to a || (a = b)
                if (['||=', '&&='].includes(node.operator)) {
                    checkNode(node.left);
                }
                else if (node.operator === '??=') {
                    checkNodeForNullish(node.left);
                }
            }