function globalVarCheck(node, parent) {
                if (!isVarOnTop(node, parent.body)) {
                    context.report({ node, messageId: "top" });
                }
            }