function reportBothOperators(node) {
                const parent = node.parent;
                const left = (getChildNode(parent) === node) ? node : parent;
                const right = (getChildNode(parent) !== node) ? node : parent;
                const data = {
                    leftOperator: left.operator || "?:",
                    rightOperator: right.operator || "?:"
                };
                context.report({
                    node: left,
                    loc: getOperatorToken(left).loc,
                    messageId: "unexpectedMixedOperator",
                    data
                });
                context.report({
                    node: right,
                    loc: getOperatorToken(right).loc,
                    messageId: "unexpectedMixedOperator",
                    data
                });
            }