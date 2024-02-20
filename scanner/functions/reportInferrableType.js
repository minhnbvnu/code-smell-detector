function reportInferrableType(node, typeNode, initNode) {
                if (!typeNode || !initNode || !typeNode.typeAnnotation) {
                    return;
                }
                if (!isInferrable(typeNode.typeAnnotation, initNode)) {
                    return;
                }
                const type = typeNode.typeAnnotation.type === utils_1.AST_NODE_TYPES.TSTypeReference
                    ? // TODO - if we add more references
                        'RegExp'
                    : keywordMap[typeNode.typeAnnotation.type];
                context.report({
                    node,
                    messageId: 'noInferrableType',
                    data: {
                        type,
                    },
                    *fix(fixer) {
                        if ((node.type === utils_1.AST_NODE_TYPES.AssignmentPattern &&
                            node.left.optional) ||
                            (node.type === utils_1.AST_NODE_TYPES.PropertyDefinition && node.definite)) {
                            yield fixer.remove(sourceCode.getTokenBefore(typeNode));
                        }
                        yield fixer.remove(typeNode);
                    },
                });
            }