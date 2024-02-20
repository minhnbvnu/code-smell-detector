function isInBooleanContext(node) {
                return ((isBooleanFunctionOrConstructorCall(node.parent) &&
                    node === node.parent.arguments[0]) ||
                    (BOOLEAN_NODE_TYPES.has(node.parent.type) &&
                        node === node.parent.test) ||
                    // !<bool>
                    (node.parent.type === "UnaryExpression" &&
                        node.parent.operator === "!"));
            }