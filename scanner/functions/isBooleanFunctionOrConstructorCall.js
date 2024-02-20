function isBooleanFunctionOrConstructorCall(node) {
                // Boolean(<bool>) and new Boolean(<bool>)
                return (node.type === "CallExpression" || node.type === "NewExpression") &&
                    node.callee.type === "Identifier" &&
                    node.callee.name === "Boolean";
            }