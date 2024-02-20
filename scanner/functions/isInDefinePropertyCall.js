function isInDefinePropertyCall(node) {
                return (node.parent.type === "CallExpression" &&
                    node.parent.arguments[0] === node &&
                    astUtils.isSpecificMemberAccess(node.parent.callee, "Object", /^definePropert(?:y|ies)$/u));
            }