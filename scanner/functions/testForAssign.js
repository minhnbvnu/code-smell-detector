function testForAssign(node) {
                if (node.test &&
                    (node.test.type === "AssignmentExpression") &&
                    (node.type === "ForStatement"
                        ? !astUtils.isParenthesised(sourceCode, node.test)
                        : !isParenthesisedTwice(node.test))) {
                    context.report({
                        node: node.test,
                        messageId: "missing"
                    });
                }
            }