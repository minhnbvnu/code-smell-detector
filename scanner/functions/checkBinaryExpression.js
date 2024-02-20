function checkBinaryExpression(node) {
                if (/^(?:[<>]|[!=]=)=?$/u.test(node.operator) &&
                    (isNaNIdentifier(node.left) || isNaNIdentifier(node.right))) {
                    context.report({ node, messageId: "comparisonWithNaN" });
                }
            }