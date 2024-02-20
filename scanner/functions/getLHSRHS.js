function getLHSRHS() {
                        switch (node.type) {
                            case utils_1.AST_NODE_TYPES.VariableDeclarator:
                                return [node.id, node.init];
                            case utils_1.AST_NODE_TYPES.PropertyDefinition:
                                return [node, node.value];
                            case utils_1.AST_NODE_TYPES.AssignmentPattern:
                                return [node.left, node.right];
                            default:
                                throw new Error(`Unhandled node type: ${node.type}`);
                        }
                    }