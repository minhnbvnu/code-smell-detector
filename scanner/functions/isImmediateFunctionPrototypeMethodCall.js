function isImmediateFunctionPrototypeMethodCall(node) {
                const callNode = astUtils.skipChainExpression(node);
                if (callNode.type !== "CallExpression") {
                    return false;
                }
                const callee = astUtils.skipChainExpression(callNode.callee);
                return (callee.type === "MemberExpression" &&
                    callee.object.type === "FunctionExpression" &&
                    ["call", "apply"].includes(astUtils.getStaticPropertyName(callee)));
            }