function checkAssignment(receiverNode, senderNode, reportingNode, comparisonType) {
                var _a;
                const receiverTsNode = esTreeNodeToTSNodeMap.get(receiverNode);
                const receiverType = comparisonType === 2 /* ComparisonType.Contextual */
                    ? (_a = util.getContextualType(checker, receiverTsNode)) !== null && _a !== void 0 ? _a : checker.getTypeAtLocation(receiverTsNode)
                    : checker.getTypeAtLocation(receiverTsNode);
                const senderType = checker.getTypeAtLocation(esTreeNodeToTSNodeMap.get(senderNode));
                if (util.isTypeAnyType(senderType)) {
                    // handle cases when we assign any ==> unknown.
                    if (util.isTypeUnknownType(receiverType)) {
                        return false;
                    }
                    let messageId = 'anyAssignment';
                    if (!isNoImplicitThis) {
                        // `var foo = this`
                        const thisExpression = (0, util_1.getThisExpression)(senderNode);
                        if (thisExpression &&
                            util.isTypeAnyType(util.getConstrainedTypeAtLocation(checker, esTreeNodeToTSNodeMap.get(thisExpression)))) {
                            messageId = 'anyAssignmentThis';
                        }
                    }
                    context.report({
                        node: reportingNode,
                        messageId,
                    });
                    return true;
                }
                if (comparisonType === 0 /* ComparisonType.None */) {
                    return false;
                }
                const result = util.isUnsafeAssignment(senderType, receiverType, checker, senderNode);
                if (!result) {
                    return false;
                }
                const { sender, receiver } = result;
                context.report({
                    node: reportingNode,
                    messageId: 'unsafeAssignment',
                    data: {
                        sender: checker.typeToString(sender),
                        receiver: checker.typeToString(receiver),
                    },
                });
                return true;
            }