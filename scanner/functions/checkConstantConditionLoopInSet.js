function checkConstantConditionLoopInSet(node) {
                if (loopsInCurrentScope.has(node)) {
                    loopsInCurrentScope.delete(node);
                    context.report({ node: node.test, messageId: "unexpected" });
                }
            }