function isForOfStatementContext(node) {
                let current = node.parent;
                while (current) {
                    switch (current.type) {
                        case utils_1.AST_NODE_TYPES.VariableDeclarator:
                        case utils_1.AST_NODE_TYPES.VariableDeclaration:
                        case utils_1.AST_NODE_TYPES.ObjectPattern:
                        case utils_1.AST_NODE_TYPES.ArrayPattern:
                        case utils_1.AST_NODE_TYPES.Property:
                            current = current.parent;
                            break;
                        case utils_1.AST_NODE_TYPES.ForOfStatement:
                            return true;
                        default:
                            current = undefined;
                    }
                }
                return false;
            }