function checkPlusOperands(node) {
                const leftType = getNodeType(node.left);
                const rightType = getNodeType(node.right);
                if (leftType === rightType) {
                    if (leftType === 'invalid') {
                        context.report({
                            node,
                            messageId: 'notValidTypes',
                        });
                    }
                    if (!allowAny && leftType === 'any') {
                        context.report({
                            node,
                            messageId: 'notValidAnys',
                        });
                    }
                    return;
                }
                if (leftType === 'any' || rightType === 'any') {
                    if (!allowAny || leftType === 'invalid' || rightType === 'invalid') {
                        context.report({
                            node,
                            messageId: 'notValidAnys',
                        });
                    }
                    return;
                }
                if (leftType === 'string' || rightType === 'string') {
                    return context.report({
                        node,
                        messageId: 'notStrings',
                    });
                }
                if (leftType === 'bigint' || rightType === 'bigint') {
                    return context.report({
                        node,
                        messageId: 'notBigInts',
                    });
                }
                if (leftType === 'number' || rightType === 'number') {
                    return context.report({
                        node,
                        messageId: 'notNumbers',
                    });
                }
            }