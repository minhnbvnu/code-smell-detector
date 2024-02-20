function bindDestructuringTargetFlow(node) {
                if (node.kind === 223 /* BinaryExpression */ && node.operatorToken.kind === 63 /* EqualsToken */) {
                    bindAssignmentTargetFlow(node.left);
                }
                else {
                    bindAssignmentTargetFlow(node);
                }
            }