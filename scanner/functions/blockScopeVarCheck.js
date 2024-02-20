function blockScopeVarCheck(node) {
                const { parent } = node;
                if (parent.type === "BlockStatement" &&
                    /Function/u.test(parent.parent.type) &&
                    isVarOnTop(node, parent.body)) {
                    return;
                }
                if (parent.type === "StaticBlock" &&
                    isVarOnTop(node, parent.body)) {
                    return;
                }
                context.report({ node, messageId: "top" });
            }