function checkMemberExpression(node) {
                const cachedState = stateCache.get(node);
                if (cachedState) {
                    return cachedState;
                }
                if (node.object.type === utils_1.AST_NODE_TYPES.MemberExpression) {
                    const objectState = checkMemberExpression(node.object);
                    if (objectState === 1 /* State.Unsafe */) {
                        // if the object is unsafe, we know this will be unsafe as well
                        // we don't need to report, as we have already reported on the inner member expr
                        stateCache.set(node, objectState);
                        return objectState;
                    }
                }
                const tsNode = esTreeNodeToTSNodeMap.get(node.object);
                const type = checker.getTypeAtLocation(tsNode);
                const state = util.isTypeAnyType(type) ? 1 /* State.Unsafe */ : 2 /* State.Safe */;
                stateCache.set(node, state);
                if (state === 1 /* State.Unsafe */) {
                    const propertyName = sourceCode.getText(node.property);
                    let messageId = 'unsafeMemberExpression';
                    if (!isNoImplicitThis) {
                        // `this.foo` or `this.foo[bar]`
                        const thisExpression = (0, util_1.getThisExpression)(node);
                        if (thisExpression &&
                            util.isTypeAnyType(util.getConstrainedTypeAtLocation(checker, esTreeNodeToTSNodeMap.get(thisExpression)))) {
                            messageId = 'unsafeThisMemberExpression';
                        }
                    }
                    context.report({
                        node,
                        messageId,
                        data: {
                            property: node.computed ? `[${propertyName}]` : `.${propertyName}`,
                        },
                    });
                }
                return state;
            }