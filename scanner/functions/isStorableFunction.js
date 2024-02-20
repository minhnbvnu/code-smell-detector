function isStorableFunction(funcNode, rhsNode) {
                    let node = funcNode;
                    let parent = funcNode.parent;
                    while (parent && isInside(parent, rhsNode)) {
                        switch (parent.type) {
                            case utils_1.AST_NODE_TYPES.SequenceExpression:
                                if (parent.expressions[parent.expressions.length - 1] !== node) {
                                    return false;
                                }
                                break;
                            case utils_1.AST_NODE_TYPES.CallExpression:
                            case utils_1.AST_NODE_TYPES.NewExpression:
                                return parent.callee !== node;
                            case utils_1.AST_NODE_TYPES.AssignmentExpression:
                            case utils_1.AST_NODE_TYPES.TaggedTemplateExpression:
                            case utils_1.AST_NODE_TYPES.YieldExpression:
                                return true;
                            default:
                                if (parent.type.endsWith('Statement') ||
                                    parent.type.endsWith('Declaration')) {
                                    /*
                                     * If it encountered statements, this is a complex pattern.
                                     * Since analyzing complex patterns is hard, this returns `true` to avoid false positive.
                                     */
                                    return true;
                                }
                        }
                        node = parent;
                        parent = parent.parent;
                    }
                    return false;
                }