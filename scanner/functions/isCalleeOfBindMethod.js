function isCalleeOfBindMethod(node) {
                if (!astUtils.isSpecificMemberAccess(node.parent, null, "bind")) {
                    return false;
                }
                // The node of `*.bind` member access.
                const bindNode = node.parent.parent.type === "ChainExpression"
                    ? node.parent.parent
                    : node.parent;
                return (bindNode.parent.type === "CallExpression" &&
                    bindNode.parent.callee === bindNode &&
                    bindNode.parent.arguments.length === 1 &&
                    bindNode.parent.arguments[0].type !== "SpreadElement");
            }