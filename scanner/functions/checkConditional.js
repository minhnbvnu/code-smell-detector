function checkConditional(node, isTestExpr = false) {
                // prevent checking the same node multiple times
                if (checkedNodes.has(node)) {
                    return;
                }
                checkedNodes.add(node);
                if (node.type === utils_1.AST_NODE_TYPES.LogicalExpression) {
                    // ignore the left operand for nullish coalescing expressions not in a context of a test expression
                    if (node.operator !== '??' || isTestExpr) {
                        checkConditional(node.left, isTestExpr);
                    }
                    // we ignore the right operand when not in a context of a test expression
                    if (isTestExpr) {
                        checkConditional(node.right, isTestExpr);
                    }
                    return;
                }
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                if (isAlwaysThenable(checker, tsNode)) {
                    context.report({
                        messageId: 'conditional',
                        node,
                    });
                }
            }