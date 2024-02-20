function isArrayIndexExpression(node) {
                return (
                // Is an index signature
                node.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.computed &&
                    // ...into an array type
                    (nodeIsArrayType(node.object) ||
                        // ... or a tuple type
                        (nodeIsTupleType(node.object) &&
                            // Exception: literal index into a tuple - will have a sound type
                            node.property.type !== utils_1.AST_NODE_TYPES.Literal)));
            }