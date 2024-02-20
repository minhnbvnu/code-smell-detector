function checkArrayDestructure(receiverNode, senderType, senderNode) {
                // any array
                // const [x] = ([] as any[]);
                if (util.isTypeAnyArrayType(senderType, checker)) {
                    context.report({
                        node: receiverNode,
                        messageId: 'unsafeArrayPattern',
                    });
                    return false;
                }
                if (!checker.isTupleType(senderType)) {
                    return true;
                }
                const tupleElements = util.getTypeArguments(senderType, checker);
                // tuple with any
                // const [x] = [1 as any];
                let didReport = false;
                for (let receiverIndex = 0; receiverIndex < receiverNode.elements.length; receiverIndex += 1) {
                    const receiverElement = receiverNode.elements[receiverIndex];
                    if (!receiverElement) {
                        continue;
                    }
                    if (receiverElement.type === utils_1.AST_NODE_TYPES.RestElement) {
                        // don't handle rests as they're not a 1:1 assignment
                        continue;
                    }
                    const senderType = tupleElements[receiverIndex];
                    if (!senderType) {
                        continue;
                    }
                    // check for the any type first so we can handle [[[x]]] = [any]
                    if (util.isTypeAnyType(senderType)) {
                        context.report({
                            node: receiverElement,
                            messageId: 'unsafeArrayPatternFromTuple',
                        });
                        // we want to report on every invalid element in the tuple
                        didReport = true;
                    }
                    else if (receiverElement.type === utils_1.AST_NODE_TYPES.ArrayPattern) {
                        didReport = checkArrayDestructure(receiverElement, senderType, senderNode);
                    }
                    else if (receiverElement.type === utils_1.AST_NODE_TYPES.ObjectPattern) {
                        didReport = checkObjectDestructure(receiverElement, senderType, senderNode);
                    }
                }
                return didReport;
            }