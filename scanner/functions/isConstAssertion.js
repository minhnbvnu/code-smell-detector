function isConstAssertion(node) {
                return (node.type === utils_1.AST_NODE_TYPES.TSTypeReference &&
                    node.typeName.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.typeName.name === 'const');
            }