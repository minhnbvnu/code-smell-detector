function checkThrowArgument(node) {
                if (node.type === utils_1.AST_NODE_TYPES.AwaitExpression ||
                    node.type === utils_1.AST_NODE_TYPES.YieldExpression) {
                    return;
                }
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                const type = checker.getTypeAtLocation(tsNode);
                if (type.flags & ts.TypeFlags.Undefined) {
                    context.report({ node, messageId: 'undef' });
                    return;
                }
                if (options.allowThrowingAny && util.isTypeAnyType(type)) {
                    return;
                }
                if (options.allowThrowingUnknown && util.isTypeUnknownType(type)) {
                    return;
                }
                if (isErrorLike(type)) {
                    return;
                }
                context.report({ node, messageId: 'object' });
            }