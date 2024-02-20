function isMemberExpInNewCallee(node) {
                if (node.type === "MemberExpression") {
                    return node.parent.type === "NewExpression" && node.parent.callee === node
                        ? true
                        : node.parent.object === node && isMemberExpInNewCallee(node.parent);
                }
                return false;
            }