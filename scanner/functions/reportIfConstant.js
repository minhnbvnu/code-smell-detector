function reportIfConstant(node) {
                if (node.test && isConstant(context.getScope(), node.test, true)) {
                    context.report({ node: node.test, messageId: "unexpected" });
                }
            }