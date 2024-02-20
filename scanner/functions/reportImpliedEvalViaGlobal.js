function reportImpliedEvalViaGlobal(globalVar) {
                const { references, name } = globalVar;
                references.forEach(ref => {
                    const identifier = ref.identifier;
                    let node = identifier.parent;
                    while (astUtils.isSpecificMemberAccess(node, null, name)) {
                        node = node.parent;
                    }
                    if (astUtils.isSpecificMemberAccess(node, null, EVAL_LIKE_FUNC_PATTERN)) {
                        const calleeNode = node.parent.type === "ChainExpression" ? node.parent : node;
                        const parent = calleeNode.parent;
                        if (parent.type === "CallExpression" && parent.callee === calleeNode) {
                            reportImpliedEvalCallExpression(parent);
                        }
                    }
                });
            }