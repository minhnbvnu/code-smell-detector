function reportUnsafeUsage(node) {
                context.report({
                    messageId: "unsafeOptionalChain",
                    node
                });
            }