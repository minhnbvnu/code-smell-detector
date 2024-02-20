function isAssignedInBodyOfForStatement(node, container) {
                let current = node;
                while (current.parent.kind === 214 /* ParenthesizedExpression */) {
                    current = current.parent;
                }
                let isAssigned = false;
                if (isAssignmentTarget(current)) {
                    isAssigned = true;
                }
                else if (current.parent.kind === 221 /* PrefixUnaryExpression */ || current.parent.kind === 222 /* PostfixUnaryExpression */) {
                    const expr = current.parent;
                    isAssigned = expr.operator === 45 /* PlusPlusToken */ || expr.operator === 46 /* MinusMinusToken */;
                }
                if (!isAssigned) {
                    return false;
                }
                return !!findAncestor(current, (n) => n === container ? "quit" : n === container.statement);
            }