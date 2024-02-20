function checkCall(node, reportingNode, messageId) {
                const tsNode = esTreeNodeToTSNodeMap.get(node);
                const type = util.getConstrainedTypeAtLocation(checker, tsNode);
                if (util.isTypeAnyType(type)) {
                    if (!isNoImplicitThis) {
                        // `this()` or `this.foo()` or `this.foo[bar]()`
                        const thisExpression = (0, util_1.getThisExpression)(node);
                        if (thisExpression &&
                            util.isTypeAnyType(util.getConstrainedTypeAtLocation(checker, esTreeNodeToTSNodeMap.get(thisExpression)))) {
                            messageId = 'unsafeCallThis';
                        }
                    }
                    context.report({
                        node: reportingNode,
                        messageId: messageId,
                    });
                }
            }