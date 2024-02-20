function isInTailCallPosition(node) {
                if (node.parent.type === "ArrowFunctionExpression") {
                    return true;
                }
                if (node.parent.type === "ReturnStatement") {
                    return !hasErrorHandler(node.parent);
                }
                if (node.parent.type === "ConditionalExpression" && (node === node.parent.consequent || node === node.parent.alternate)) {
                    return isInTailCallPosition(node.parent);
                }
                if (node.parent.type === "LogicalExpression" && node === node.parent.right) {
                    return isInTailCallPosition(node.parent);
                }
                if (node.parent.type === "SequenceExpression" && node === node.parent.expressions[node.parent.expressions.length - 1]) {
                    return isInTailCallPosition(node.parent);
                }
                return false;
            }