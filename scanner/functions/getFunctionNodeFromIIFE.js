function getFunctionNodeFromIIFE(node) {
                const callee = astUtils.skipChainExpression(node.callee);
                if (callee.type === "FunctionExpression") {
                    return callee;
                }
                if (includeFunctionPrototypeMethods &&
                    callee.type === "MemberExpression" &&
                    callee.object.type === "FunctionExpression" &&
                    (astUtils.getStaticPropertyName(callee) === "call" || astUtils.getStaticPropertyName(callee) === "apply")) {
                    return callee.object;
                }
                return null;
            }