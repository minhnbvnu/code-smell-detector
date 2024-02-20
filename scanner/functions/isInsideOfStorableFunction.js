function isInsideOfStorableFunction(id, rhsNode) {
                /**
                 * Finds a function node from ancestors of a node.
                 * @param node A start node to find.
                 * @returns A found function node.
                 */
                function getUpperFunction(node) {
                    let currentNode = node;
                    while (currentNode) {
                        if (utils_1.ASTUtils.isFunction(currentNode)) {
                            return currentNode;
                        }
                        currentNode = currentNode.parent;
                    }
                    return null;
                }
                /**
                 * Checks whether a given function node is stored to somewhere or not.
                 * If the function node is stored, the function can be used later.
                 * @param funcNode A function node to check.
                 * @param rhsNode The RHS node of the previous assignment.
                 * @returns `true` if under the following conditions:
                 *      - the funcNode is assigned to a variable.
                 *      - the funcNode is bound as an argument of a function call.
                 *      - the function is bound to a property and the object satisfies above conditions.
                 */
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
                const funcNode = getUpperFunction(id);
                return (!!funcNode &&
                    isInside(funcNode, rhsNode) &&
                    isStorableFunction(funcNode, rhsNode));
            }