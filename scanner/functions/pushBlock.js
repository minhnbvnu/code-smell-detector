function pushBlock(node) {
                const len = ++functionStack[functionStack.length - 1];
                if (len > maxDepth) {
                    context.report({ node, messageId: "tooDeeply", data: { depth: len, maxDepth } });
                }
            }