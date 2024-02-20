function extractNameFromExpression(node) {
                return node.callee.type === "Identifier"
                    ? node.callee.name
                    : astUtils.getStaticPropertyName(node.callee) || "";
            }