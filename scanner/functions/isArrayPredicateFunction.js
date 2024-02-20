function isArrayPredicateFunction(node) {
                const { callee } = node;
                return (
                // looks like `something.filter` or `something.find`
                callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    callee.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                    ARRAY_PREDICATE_FUNCTIONS.has(callee.property.name) &&
                    // and the left-hand side is an array, according to the types
                    (nodeIsArrayType(callee.object) || nodeIsTupleType(callee.object)));
            }