function endChecking(node) {
                if (!node.generator) {
                    return;
                }
                const countYield = stack.pop();
                if (countYield === 0 && node.body.body.length > 0) {
                    context.report({ node, messageId: "missingYield" });
                }
            }