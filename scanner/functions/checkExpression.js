function checkExpression(node, type) {
                if (node.type === utils_1.AST_NODE_TYPES.Literal) {
                    return;
                }
                const certainty = collectToStringCertainty(type !== null && type !== void 0 ? type : typeChecker.getTypeAtLocation(parserServices.esTreeNodeToTSNodeMap.get(node)));
                if (certainty === Usefulness.Always) {
                    return;
                }
                context.report({
                    data: {
                        certainty,
                        name: context.getSourceCode().getText(node),
                    },
                    messageId: 'baseToString',
                    node,
                });
            }