function reportUnsafeArithmetic(node) {
                context.report({
                    messageId: "unsafeArithmetic",
                    node
                });
            }