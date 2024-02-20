function isMatchingIdentifier(node, name) {
                return node.type === utils_1.AST_NODE_TYPES.Identifier && node.name === name;
            }